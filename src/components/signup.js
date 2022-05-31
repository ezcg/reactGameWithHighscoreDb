import React, {useContext} from 'react'
import {GlobalContext} from "../context/GlobalState";

export default function Signup () {

  const { isLoggedIn, isSignedUp, setMessage, setIsSignedUp, showSignupForm, setShowSignupForm, showLoginForm } = useContext(GlobalContext);

  function handleCancelSubmit() {
    setShowSignupForm(0)
    setMessage("")
  }
  function handleShowSignupClick() {
    setShowSignupForm(1)
    setMessage("Fill out the form and a code will be sent to the email address you provide. Passwords requirements: UPPERCASE and lowercase characters.")
  }
  function handleSignupSubmit() {
    setIsSignedUp(1)
    setShowSignupForm(0)
    setMessage("Retrieve the code sent to your email address and submit the code below.")
  }

  let signupBtnStyle = {display:"none"}
  let signupFormStyle = {display:"none"}
  if (!showLoginForm && showSignupForm) {
    signupFormStyle = {display:"block"}
  } else if (!showLoginForm && !isSignedUp && !isLoggedIn) {
    signupBtnStyle = {display:"block"}
  }
console.log("signup.js isLoggedIn", isLoggedIn, "isSignedUp", isSignedUp, "showSignupForm", showSignupForm)
  return (
    <div key = {isSignedUp + "_" + isLoggedIn + "_" + showSignupForm}>
      <div className="signupBlock" style={signupBtnStyle}>
        <button className="submitBtn"  onClick={handleShowSignupClick}>Signup</button>
      </div>
      <div className="signupFormCont" style={signupFormStyle}>
        <div className="signupBlock">
          email: <input className='emailField' type='text'/>
          <br/>
          password: <input className='passwordField' type='password' />
          <br />
          confirm password: <input className='passwordField' type='password' />
          <br />
          <button className="submitBtn"  onClick={handleSignupSubmit}>Submit</button>
          <button className="cancelBtn"  onClick={handleCancelSubmit}>Cancel</button>
        </div>
        <div className="cb"></div>
      </div>
    </div>
  )

}