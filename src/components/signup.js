import React, {useContext} from 'react'
import {GlobalContext} from "../context/GlobalState";

export default function Signup () {

  const { isLoggedIn, isSignedUp, setIsSignedUp, showSignupForm, setShowSignupForm } = useContext(GlobalContext);

  function handleShowSignupClick() {
    setShowSignupForm(1)
  }
  function handleSignupSubmit() {
    setIsSignedUp(1)
    setShowSignupForm(0)
  }

  let signupBtnStyle = {display:"none"}
  let signupFormStyle = {display:"none"}
  if (showSignupForm) {
    signupFormStyle = {display:"block"}
  } else if (!isSignedUp && !isLoggedIn) {
    signupBtnStyle = {display:"block"}
  }
console.log("isLoggedIn", isLoggedIn, "isSignedUp", isSignedUp, "showSignupForm", showSignupForm)
  return (
    <div>
      <div className="signupBlock" style={signupBtnStyle}>
        <button className="submitBtn"  onClick={handleShowSignupClick}>Signup</button>
      </div>
      <div className="signupBlock" style={signupFormStyle}>
        email: <input className='emailField' type='text' />
        password: <input className='emailField' type='password' />
        password: <input className='emailField' type='password' />
        <button className="submitBtn"  onClick={handleSignupSubmit}>Submit</button>
      </div>
    </div>
  )

}