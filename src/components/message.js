import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

export default function Message () {

  const { message } = useContext(GlobalContext)
  let messageStyle = {display:'none'}
  if (message) {
    messageStyle = {display:"block"}
  }

  return (
    <div key={message} className="msg" style = {messageStyle}>
      {message}
    </div>
  )
}