import React, {useContext} from 'react'
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
    isVerified,
    setIsVerified,
    userId,
    setUserId
  } = useContext(GlobalContext);

  function handleLogin() {
    setUserId("matt")
    setIsLoggedIn(1)
    setShowLoginForm(0)
    setMessage("")
  }
  function handleShowLoginForm() {
    setShowLoginForm(1)
  }
  function handleLogoutClick() {
    setIsLoggedIn(0)
    setIsSignedUp(0)
    setUserId("")
  }
  function handleVerifyCode() {
    setIsVerified(1)
    setShowLoginForm(1)
    setMessage("Verified! Now login and you'll be able to submit your highscores.")
  }

  console.log(
    "isLoggedIn",
    isLoggedIn,
    "showLoginForm",
    showLoginForm,
    "isLoggedIn",
    isLoggedIn,
    "isSignedUp",
    isSignedUp,
    "isVerified",
    isVerified,
    "userId",
    userId)

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
      <div style={loginFormStyle} className="verifyBlock">
        email: <input className='emailField' type='text' />
        password: <input className='emailField' type='password' />
        <button className="submitBtn" onClick={handleLogin}>Submit</button>
      </div>
    </div>
  )

}