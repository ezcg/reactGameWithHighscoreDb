import React, {useContext, useState} from 'react'
import {GlobalContext} from "../context/GlobalState";

export default function Verify () {

  const {
    setMessage,
    setShowLoginForm,
    setIsLoggedIn,
    setIsSignedUp,
    setIsVerified,
    setUserId,
    setEmailVerified,
    setPasswordVerified,
    emailUnverified,
    setEmailUnverified,
    passwordUnverified,
    setPasswordUnverified,
    showVerifyForm,
    setShowVerifyForm,
    setShowSpinner
  } = useContext(GlobalContext);

  let [data, setData] = useState({ "codeForm": "" })

  const changeHandler = e => {
    let obj = { [e.target.name]: e.target.value }
    setData({ ...data, ...obj })
  }
  const { codeForm } = data;

  function handleCancelSubmit() {
    setShowVerifyForm(0)
    setIsSignedUp(0)
    setMessage("")
    setEmailVerified("")
    setPasswordVerified("")
    setEmailUnverified("")
    setPasswordUnverified("")
  }

  async function handleVerifyCodeSubmit(e) {
    e.preventDefault();
    //console.log("handleVerifyCodeSubmit() emailUnverified, codeForm", emailUnverified, codeForm)
    setShowSpinner(1)
    let r = await window.ScoreApp.confirm(emailUnverified, codeForm)
    if (r.result === true) {
      setIsVerified(1)
      setIsLoggedIn(1)
      setShowLoginForm(0)
      setShowVerifyForm(0)
      setMessage("Verified!")
      setEmailVerified(emailUnverified)
      setPasswordVerified(passwordUnverified)
      setUserId(emailUnverified)
      let r2 = await window.ScoreApp.login(emailUnverified, passwordUnverified)
      setShowSpinner(0)
      if (r2.result === false) {
        setMessage(r2.message)
        return
      }
    } else {
      setShowSpinner(0)
      setMessage(r.message)
      console.log("login.js handleVerifyCode r:", r)
    }
  }

  async function handleResendVerifyCode() {
    console.log("login.js handleResendVerifyCode() email:", emailUnverified)
    setShowSpinner(1)
    let r = await window.ScoreApp.resend(emailUnverified)
    let obj = {codeForm:""}
    setData({ ...data, ...obj })
    if (r.result === false) {
      setMessage(r.message)
    } else {
      setMessage("Retrieve the code sent to " + emailUnverified + " and submit the code below.")
    }
    setShowSpinner(0)
  }

  let verifyFormStyle = {display:'none'}
  if (showVerifyForm) {
    verifyFormStyle = { display: "block" }
  }

  return (<div>
      <form style={verifyFormStyle} className="block" onSubmit={handleVerifyCodeSubmit}>
        Code: <input name="codeForm" className='verifyCodeField' type='text' value={codeForm} onChange={changeHandler}
                     required/>
        <button className="scoreBtn">Submit</button>
        <button className="scoreBtn" onClick={handleCancelSubmit}>Cancel</button>
        <span className="scoreBtn" onClick={handleResendVerifyCode}>Resend</span>
      </form>
    </div>
  )

}