import React, {useContext, useState} from 'react'
import {GlobalContext} from "../context/GlobalState";

export default function Login () {

  const {
    setMessage,
    setShowLoginForm,
    showLoginForm,
    showSignupForm,
    isLoggedIn,
    setIsLoggedIn,
    isSignedUp,
    setIsSignedUp,
    setShowSignupForm,
    isVerified,
    setIsVerified,
    userId,
    setUserId,
    highScore,
    setHighScore
  } = useContext(GlobalContext);

  let [data, setData] = useState({"email":"","password":""})

  const changeHandler = e => {
    let obj = {[e.target.name]:e.target.value}
    setData({...data, ...obj})
  }
  const {email, password} = data;

  async function handleLoginSubmit(e) {
    e.preventDefault();
    let r = await window.ScoreApp.login(email, password)
    if (r.result === false) {
      setMessage(r.message)
      return
    }
    setUserId(email)
    setIsVerified(1)
    setIsLoggedIn(1)
    setShowLoginForm(0)
    setMessage("")
    let score = await window.ScoreApp.retrieveScore(email)
    setHighScore(score)
  }
  function handleShowLoginForm() {
    setShowLoginForm(1)
    setShowSignupForm(0)
  }
  async function handleLogoutClick() {
    window.ScoreApp.logout()
    setIsLoggedIn(0)
    setIsSignedUp(0)
    setUserId("")
    setUserId("")
    setIsVerified(0)
    setIsLoggedIn(0)
    setShowLoginForm(0)
    setMessage("")
  }
  function handleCancelSubmit() {
    setShowLoginForm(0)
    setMessage("")
  }

  async function handleVerifyCode() {

    setIsVerified(1)
    setShowLoginForm(1)
    setMessage("Verified! Now login and you'll be able to submit your highscores.")
  }

  // console.log("login.js",
  //   "isLoggedIn",
  //   isLoggedIn,
  //   "showLoginForm",
  //   showLoginForm,
  //   "isLoggedIn",
  //   isLoggedIn,
  //   "isSignedUp",
  //   isSignedUp,
  //   "isVerified",
  //   isVerified,
  //   "userId",
  //   userId)

  // possible states:
  // signed up but not verified
  // verified but not logged in
  // verified and not logged in
  // verified and logged in

  let verifyFormStyle = {display:'none'}
  let loginFormStyle = {display:'none'}
  let loginBtnStyle = {display:'none'}
  let loggedInStyle = {display:'none'}
  if (!showSignupForm) {
    if (isSignedUp && !isVerified) {
      // show the code verification form
      verifyFormStyle = { display: "block" }
    } else if (!isLoggedIn && !showLoginForm) {
      // show the login button to trigger display of the login form
      loginBtnStyle = { display: "block" }
    } else if ((isVerified && isSignedUp && !isLoggedIn) || showLoginForm) {
      // show the login form
      loginFormStyle = { display: "block" }
    } else if (isLoggedIn && isVerified) {
      // show the userId and logout btn
      loggedInStyle = { display: "block" }
    }
  }

  return (<div>
      <div style={loggedInStyle} className="loginBlock">
        <span className="userId">{userId} : </span>
        <button className="submitBtn" onClick={handleLogoutClick}>Log Out</button>
      </div>
      <div style={loginBtnStyle} className="loginBlock">
        <button className="submitBtn" onClick={handleShowLoginForm}>Log In</button>
      </div>
      <div style={verifyFormStyle} className="verifyBlock">
        Code: <input className='verifyCodeField' type='text' />
        <button className="submitBtn" onClick={handleVerifyCode}>Submit</button>
      </div>
      <form style={loginFormStyle} className="verifyBlock"  onSubmit={handleLoginSubmit}>
        email: <input name="email" className='emailField' type='text' value={email} onChange={changeHandler} required />
        password: <input name="password" className='emailField' type='password' value={password} onChange={changeHandler} required />
        <input type = "submit" className="submitBtn" />
        <button className="cancelBtn"  onClick={handleCancelSubmit}>Cancel</button>
      </form>
    </div>
  )

}