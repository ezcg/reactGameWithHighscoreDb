import React, {useContext, useState} from 'react'
import {GlobalContext} from "../context/GlobalState";

export default function Signup () {

  const {
    isLoggedIn,
    isSignedUp,
    setMessage,
    setIsSignedUp,
    showSignupForm,
    setShowSignupForm,
    showLoginForm,
    setEmailUnverified,
    setPasswordUnverified,
    showVerifyForm,
    setShowVerifyForm,
    showSpinner,
    setShowSpinner
  } = useContext(GlobalContext);

  let [data, setData] = useState({"emailForm":"","passwordForm":"", "confirmPasswordForm":""})

  const changeHandler = e => {
    let obj = {[e.target.name]:e.target.value}
    setData({...data, ...obj})
  }
  const {emailForm, passwordForm, confirmPasswordForm} = data;

  function handleCancelSubmit() {
    setShowSignupForm(0)
    setMessage("")
    setEmailUnverified("")
    setPasswordUnverified("")
  }
  function handleShowSignupClick() {
    setShowSignupForm(1)
    setMessage("Fill out the form and a code will be sent to the email address. <br/>Passwords requirements: " + window.passwordRequirements)
  }
  async function handleSignupSubmit(e) {
    e.preventDefault();
    let r = await window.ScoreApp.signup(emailForm, passwordForm, confirmPasswordForm)
    if (r.result === false) {
      setMessage(r.message)
    } else {
      setShowVerifyForm(1)
      setIsSignedUp(1)
      setShowSignupForm(0)
      setEmailUnverified(emailForm)
      setPasswordUnverified(passwordForm)
      setMessage("Retrieve the code sent to " + emailForm + " and submit the code below.")
    }
  }

  let signupBtnStyle = {display:"none"}
  let signupFormStyle = {display:"none"}
  if (!showLoginForm && !showVerifyForm && showSignupForm) {
    signupFormStyle = {display:"block"}
  } else if (!showLoginForm && !isSignedUp && !showVerifyForm && !isLoggedIn) {
    signupBtnStyle = {display:"block"}
  }

  return (
    <div key = {isSignedUp + "_" + isLoggedIn + "_" + showSignupForm}>
      {/*Button to show signup form*/}
      <div className="block" style={signupBtnStyle}>
        <button className="scoreBtn"  onClick={handleShowSignupClick}>Signup</button>
      </div>
      {/*Signup form*/}
      <form className="signupFormCont" style={signupFormStyle} onSubmit={handleSignupSubmit}>
        <div className="block">
          email:
          <input
            name="emailForm"
            className='emailField'
            type='text'
            value={emailForm}
            onChange={changeHandler}
            required
          />
          <br/>
          password:
          <input
            name="passwordForm"
            className='passwordField'
            type='password'
            value={passwordForm}
            onChange={changeHandler}
            required
          />
          <br />
          confirm password:
          <input
            name="confirmPasswordForm"
            className='passwordField'
            type='password'
            value={confirmPasswordForm}
            onChange={changeHandler}
            required
          />
          <br />
          <button className="scoreBtn">Submit</button>
          <button className="scoreBtn" onClick={handleCancelSubmit}>Cancel</button>
        </div>
        <div className="cb"></div>
      </form>
    </div>
  )

}