var ScoreApp = window.ScoreApp || {};

(function scopeWrapper($) {

  var userPool = new window.AmazonCognitoIdentity.CognitoUserPool(window.poolData);

  var token = null;

  var apiClient = window.apigClientFactory.newClient();

  ScoreApp.checkLogin = function (redirectOnRec, redirectOnUnrec) {
    var cognitoUser = userPool.getCurrentUser();
    //console.log("checkLogin cognitoUser:", cognitoUser)
    if (cognitoUser !== null) {
      return userPool.getCurrentUser().getUsername();
    } else {
      return false
    }
  };

  ScoreApp.login = async function (email, password) {
    console.log("ScoreApp.login() email", email)
    let resultObj = {result:false, message:""}
    let isValidEmail = validateEmail(email)
    //console.log("email", isValidEmail)
    if (!isValidEmail) {
      resultObj.message = "Invalid email: " + email
      return resultObj
    }

    var authenticationData = {
      Username: email,
      Password: password
    };

    var authenticationDetails = new window.AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var userData = {
      Username: email,
      Pool: userPool
    }

    var cognitoUser = new window.AmazonCognitoIdentity.CognitoUser(userData);
    //console.log("login() cognitoUser", cognitoUser)
    let promise = new Promise ((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function () {
          resultObj.result = true
          return resolve(resultObj)
        },
        onFailure: function (err) {
          if (err['code'] === 'UserNotConfirmedException') {
            resultObj.message = "Email not confirmed. Enter the code that was emailed to " + email + " in the Confirm Signup form below. If you did not receive it, check your spam folder. Failing that, hit resend."
            //resultObj.message = "Enter the code emailed to " + email + "."
          } else if (err['code'] === 'NotAuthorizedException') {
            resultObj.message = "Not recognizing that email and password."
          } else {
            console.log("unmapped error:", err['code'], err)
          }
          return reject(resultObj)
        }
      })
    })

    return promise.then((r) => {
      return r
    }).catch((err) => {
      return err
    })

  };

  ScoreApp.logout = function () {
    var cognitoUser = userPool.getCurrentUser();
    cognitoUser.signOut();
  };

  ScoreApp.sendScore = async function (score) {
    let promise = new Promise((resolve, reject) => {
      try {
        ScoreApp.useToken(function (token) {
          apiClient.scorePost({}, { score: score }, { headers: { Authorization: token } })
            .then(function (r) {
              console.log(r)
              if (r.data.statusCode === 200) {
                return resolve(r.data.body)
              } else {
                return reject(r.data.body)
              }
            })
        })
      } catch(e) {
        return reject(e)
      }
    })
    return promise.then((r) => {
      //console.log("ScoreApp.sendScore r", r)
      return r
    }).catch((err) => {
      //console.log("ScoreApp.sendScore err", err)
      return err
    })
  };

  ScoreApp.retrieveScore = async function (email) {
    let promise = new Promise ((resolve, reject) => {
      ScoreApp.useToken(function (token) {
        try {
          //console.log("retrieveScore token.length:", token.length)
          apiClient.scoreUserIdGet({ "user_id": email }, {}, { headers: { Authorization: token } })
            .then(function (r) {
              let body = JSON.parse(r.data.body)
              console.log("ScoreApp.retrieveScore body", body)
              let score = 0
              if (typeof body.score !== 'undefined') {
                score = body.score
              }
              return resolve(score)
            })
        } catch(e) {
          return reject(e)
        }
      })
    })

    return promise.then((r) => {
      return r
    }).catch((err) => {
      return err
    })
  }

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  ScoreApp.signup = async function (email, password, confirmPassword) {
    let obj = {result:false, message:""}
      if (password !== confirmPassword) {
        obj.message = "Passwords are not matching. Please try again."
        return obj
      }
      if (!validateEmail(email)) {
        obj.message = "Invalid email address:" + email +" - please try again."
        return obj
      }
      // return from new window.AmazonCognitoIdentity.CognitoUserAttribute was set to 'email' variable ?!?
      let cognitoUser = new window.AmazonCognitoIdentity.CognitoUserAttribute({
          Name: 'email',
          Value: email
      });
      console.log("ScoreApp.signup email returned from cognito:", email)

      let promise = new Promise((resolve,reject) => {
        userPool.signUp(email, password, [cognitoUser], null, function (err, result) {
          if (err) {
            return reject(err)
          } else {
            return resolve()
          }
        })
      })
      return promise.then((r) => {
        obj.result = true
        return obj
      }).catch((e) => {
        obj.message = e
        return obj
      })
  };

  ScoreApp.confirm = function (email, code) {
    console.log("confirm()", email)
    let obj = {result:false, message:""}
      var cognitoUser = new window.AmazonCognitoIdentity.CognitoUser({
          Username: email,
          Pool: userPool
      });
      // forceAliasCreation set to true causes the same email address to be used for different usernames?
      //cognitoUser.confirmRegistration($('#code').val(), true, function (err, results) {
    let promise = new Promise((resolve,reject) => {
      cognitoUser.confirmRegistration(code, false, function (err, results) {
        if (err) {
          return reject(err)
        } else {
          return resolve()
        }
      })
    })
    promise.then((r) => {
      obj.result = true
      obj.message = "Confirmed! Please login to continue."
      return obj
    }).catch((e) => {
      obj.message = e
    })
  }

  ScoreApp.resend = function (email) {
    console.log("resend()", email)
    let obj = {result:false, message:""}
    let promise = new Promise((resolve, reject) => {
      var cognitoUser = new window.AmazonCognitoIdentity.CognitoUser({
        Username: email,
        Pool: userPool
      });
      cognitoUser.resendConfirmationCode(function (err) {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
    promise.then(() => {
      obj.result = true
    }).catch((e) => {
      obj.message = e
      return obj
    })
  };

  ScoreApp.useToken = function (callback) {
    if (token === null) {
      var cognitoUser = userPool.getCurrentUser();
      if (cognitoUser !== null) {
        cognitoUser.getSession(function (err, session) {
          if (err) {
            alert(err)
            return
          }
          token = session.getIdToken().getJwtToken();
          callback(token);
        });
      }
    } else {
      console.log("useToken() token not null")
      callback(token);
    }
  };

}(window.jQuery));