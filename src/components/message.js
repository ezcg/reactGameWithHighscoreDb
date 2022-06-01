import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

export default function Message () {

  let {setMessage} = useContext(GlobalContext)
  function closeMsg() {
    setMessage("")
  }

  const { message } = useContext(GlobalContext)
  let messageStyle = {display:'none'}
  if (message) {
    messageStyle = {display:"block"}
  }

  return (
    <div key={message} className="msg" style = {messageStyle}>
      <span className="closeX" onClick={() =>closeMsg()}>X</span>
      <div dangerouslySetInnerHTML={{ __html: message}} />
    </div>
  )

}