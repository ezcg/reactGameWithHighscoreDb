var ScoreApp = window.ScoreApp || {};

(function scopeWrapper() {

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
    //console.log("ScoreApp.login() email", email)
    let resultObj = {result:false, message:"", userConfirmed:true}
    //console.log("login() cognitoUser", cognitoUser)
    let promise = new Promise ((resolve, reject) => {
      let isValidEmail = validateEmail(email)
      //console.log("email", isValidEmail)
      if (!isValidEmail) {
        resultObj.message = "Invalid email: " + email
        return reject(resultObj)
      }
      try {
        var authenticationData = {
          Username: email,
          Password: password
        }
        var authenticationDetails = new window.AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var userData = {
          Username: email,
          Pool: userPool
        }
        var cognitoUser = new window.AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function () {
            resultObj.result = true
            resolve(resultObj)
          },
          onFailure: function (err) {
            if (err['code'] === 'UserNotConfirmedException') {
              resultObj.message = "Email not confirmed. Enter the code that was emailed to " + email + " in the form below. If you did not receive it, check your spam folder. Failing that, hit resend."
              resultObj.userConfirmed = false
            } else if (err['code'] === 'NotAuthorizedException') {
              resultObj.message = "Not recognizing that email and password."
            } else {
              console.log("unmapped error:", err['code'], err)
              resultObj.message = err
            }
            reject()
          }
        })
      } catch(e) {
        reject(e)
      }
    })

    return promise.then(() => {
      return resultObj
    }).catch(() => {
      return resultObj
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
              //console.log(r)
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
              //console.log("ScoreApp.retrieveScore r", r)
              return resolve(r.data.body.score)
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
    let resultObj = {result:false, message:""}
    let promise = new Promise((resolve,reject) => {
      if (password !== confirmPassword) {
        resultObj.message = "Passwords are not matching. Please try again."
        return reject()
      }
      if (!validateEmail(email)) {
        resultObj.message = "Invalid email address:" + email +" - please try again."
        return reject()
      }
      try {
        let cognitoUser = new window.AmazonCognitoIdentity.CognitoUserAttribute({
          Name: 'email',
          Value: email
        });
        //console.log("ScoreApp.signup email returned from cognito:", email)
        userPool.signUp(email, password, [cognitoUser], null, function (err, result) {
          if (err) {
            //console.log("ScoreApp.signup", err)
            if (err['code'] === 'UsernameExistsException') {
              resultObj.message = 'An account made with ' + email + ' already exists.'
            } else if (err['code'] === 'InvalidPasswordException') {
              resultObj.message = "Password requirements: " + window.passwordRequirements
            } else {
              resultObj.message = err
            }
            reject()
          } else {
            resolve()
          }
        })
      } catch(e) {
        resultObj.message = e
        reject()
      }
    })
    return promise.then((r) => {
      resultObj.result = true
      return resultObj
    }).catch(() => {
      return resultObj
    })
  };

  ScoreApp.confirm = function (email, code) {
    //console.log("ScoreApp.confirm() email, code", email, code)
    let resultObj = {result:false, message:""}
    let promise = new Promise((resolve,reject) => {
      if (!validateEmail(email)) {
        resultObj.message = "Invalid email: " + email
        reject()
      }
      if (!code ) {
        resultObj.message = "Code not found in form. Please enter the code sent to " + email
        reject()
      }
      try {
        var cognitoUser = new window.AmazonCognitoIdentity.CognitoUser({
          Username: email,
          Pool: userPool
        });
        // ForceAliasCreation
        // Boolean to be specified to force user confirmation irrespective of existing alias. By default set to False.
        // If this parameter is set to True and the phone number/email used for sign up confirmation already exists as
        // an alias with a different user, the API call will migrate the alias from the previous user to the newly
        // created user being confirmed. If set to False, the API will throw an AliasExistsException error.
        cognitoUser.confirmRegistration(code, false, function (err, results) {
          if (err) {
            //console.log("ScoreApp.confirm err", err)
            //console.log("ScoreApp.confirm err", err['code'])
            if (err['code'] === 'CodeMismatchException') {
              resultObj.message = "Invalid verification code. Check the code sent to " + email + " and please try again."
              reject()
            } else
              resultObj.message = err
              reject()
          } else {
            //console.log("ScoreApp.confirm results", results)
            resolve()
          }
        })
      } catch(e) {
        reject(e)
      }
    })
    return promise.then(() => {
      resultObj.result = true
      resultObj.message = "Confirmed! Please login to continue."
      return resultObj
    }).catch(() => {
      return resultObj
    })
  }

  ScoreApp.resend = function (email) {
    //console.log("ScoreApp.resend()", email)
    let resultObj = {result:false, message:""}
    let promise = new Promise((resolve, reject) => {
      try {
        var cognitoUser = new window.AmazonCognitoIdentity.CognitoUser({
          Username: email,
          Pool: userPool
        });
        cognitoUser.resendConfirmationCode(function (err) {
          if (err) {
            resultObj.message = err
            reject()
          }
          resolve()
        })
      } catch(e) {
        resultObj.message = e
        reject()
      }
    })
    return promise.then(() => {
      resultObj.result = true
      return resultObj
    }).catch(() => {
      return resultObj
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
      //console.log("useToken() token not null")
      callback(token);
    }
  };

}());