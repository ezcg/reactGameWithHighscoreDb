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
    showLoginForm
  } = useContext(GlobalContext);

  let [data, setData] = useState({"email":"","password":"", "confirmPassword":""})

  const changeHandler = e => {
    let obj = {[e.target.name]:e.target.value}
    setData({...data, ...obj})
  }
  const {email, password, confirmPassword} = data;

  function handleCancelSubmit() {
    setShowSignupForm(0)
    setMessage("")
  }
  function handleShowSignupClick() {
    setShowSignupForm(1)
    setMessage("Fill out the form and a code will be sent to the email address you provide. Passwords requirements: UPPERCASE and lowercase characters.")
  }
  async function handleSignupSubmit(e) {
    e.preventDefault();
    let r = await window.ScoreApp.signup(email, password, confirmPassword)
    if (r.result === false) {
      setMessage(r.message)
    } else {
      setIsSignedUp(1)
      setShowSignupForm(0)
      setMessage("Retrieve the code sent to " + email + " and submit the code below.")
    }
  }

  let signupBtnStyle = {display:"none"}
  let signupFormStyle = {display:"none"}
  if (!showLoginForm && showSignupForm) {
    signupFormStyle = {display:"block"}
  } else if (!showLoginForm && !isSignedUp && !isLoggedIn) {
    signupBtnStyle = {display:"block"}
  }
//console.log("signup.js isLoggedIn", isLoggedIn, "isSignedUp", isSignedUp, "showSignupForm", showSignupForm)
  return (
    <div key = {isSignedUp + "_" + isLoggedIn + "_" + showSignupForm}>
      <div className="signupBlock" style={signupBtnStyle}>
        <button className="submitBtn"  onClick={handleShowSignupClick}>Signup</button>
      </div>
      <form className="signupFormCont" style={signupFormStyle} onSubmit={handleSignupSubmit}>
        <div className="signupBlock">
          email: <input name="email" className='emailField' type='text' value={email} onChange={changeHandler} required />
          <br/>
          password: <input name="password" className='passwordField' type='password' value={password} onChange={changeHandler} required  />
          <br />
          confirm password: <input name="confirmPassword" className='passwordField' type='password' value={confirmPassword}  onChange={changeHandler} required  />
          <br />
          <button className="submitBtn">Submit</button>
          <button className="cancelBtn" onClick={handleCancelSubmit}>Cancel</button>
        </div>
        <div className="cb"></div>
      </form>
    </div>
  )

}