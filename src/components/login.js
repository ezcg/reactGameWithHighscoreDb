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
    setIsSignedUp,
    setShowSignupForm,
    isVerified,
    setIsVerified,
    userId,
    setUserId,
    setHighScore,
    setEmailVerified,
    setEmailUnverified,
    setPasswordVerified,
    setPasswordUnverified,
    showVerifyForm,
    setShowVerifyForm,
    setRight,
    setWrong,
    setGameover,
    setShowSpinner,
    setCurrentScore
  } = useContext(GlobalContext)

  let [data, setData] = useState({"emailForm":"","passwordForm":""})

  const changeHandler = e => {
    let obj = {[e.target.name]:e.target.value}
    setData({...data, ...obj})
  }
  const {emailForm, passwordForm} = data;

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setShowSpinner(1)
    let r = await window.ScoreApp.login(emailForm, passwordForm)
    setShowSpinner(0)
    if (r.result === false) {
      if (r.userConfirmed === false) {
        setShowVerifyForm(1)
        setIsVerified(0)
        setShowLoginForm(0)
        setIsSignedUp(1)
        setEmailUnverified(emailForm)
        setPasswordUnverified(passwordForm)
      }
      setMessage(r.message)
      return
    }
    setCurrentScore(0)
    setEmailVerified(emailForm)
    setPasswordVerified(passwordForm)
    setEmailUnverified("")
    setPasswordUnverified("")
    setUserId(emailForm)
    setIsVerified(1)
    setIsLoggedIn(1)
    setShowLoginForm(0)
    setMessage("")
    setShowSpinner(1)
    let score = await window.ScoreApp.retrieveScore(emailForm)
    setHighScore(score)
    setShowSpinner(0)
  }
  function handleShowLoginForm() {
    setShowLoginForm(1)
    setShowSignupForm(0)
  }
  async function handleLogoutClick() {
    setHighScore(0)
    setWrong(0)
    setRight(0)
    setIsLoggedIn(0)
    setIsSignedUp(0)
    setUserId("")
    setIsVerified(0)
    setIsLoggedIn(0)
    setShowLoginForm(0)
    setGameover(0)
    setMessage("")
    setEmailVerified("")
    setPasswordVerified("")
    setEmailUnverified("")
    setPasswordUnverified("")
    window.ScoreApp.logout()
  }
  function handleCancelSubmit() {
    setShowLoginForm(0)
    setIsSignedUp(0)
    setMessage("")
    setEmailVerified("")
    setPasswordVerified("")
    setEmailUnverified("")
    setPasswordUnverified("")
  }

  let loginFormStyle = {display:'none'}
  let loginBtnStyle = {display:'none'}
  let loggedInStyle = {display:'none'}
  if (!showLoginForm && !showSignupForm && !showVerifyForm && !isLoggedIn) {
    // show the login button to trigger display of the login form
    loginBtnStyle = { display: "block" }
  } else if (showLoginForm) {
    // show the login form
    loginFormStyle = { display: "block" }
  } else if (isLoggedIn && isVerified) {
    // show the userId and logout btn
    loggedInStyle = { display: "block" }
  }

  return (<div>
      {/*Log out button*/}
      <div style={loggedInStyle} className="block">
        <span className="userId">{userId} : </span>
        <button className="scoreBtn" onClick={handleLogoutClick}>Log Out</button>
      </div>
      {/*Button to show login form*/}
      <div style={loginBtnStyle} className="block">
        <button className="scoreBtn" onClick={handleShowLoginForm}>Log In</button>
      </div>
      {/*Log in form*/}
      <form style={loginFormStyle} className="block" onSubmit={handleLoginSubmit}>
        email: <input name="emailForm" className='emailField' type='text' value={emailForm} onChange={changeHandler} required />
        password: <input name="passwordForm" className='emailField' type='password' value={passwordForm} onChange={changeHandler} required />
        <button className="scoreBtn" >Submit</button>
        <span className="scoreBtn"  onClick={handleCancelSubmit}>Cancel</span>
      </form>
    </div>
  )

}