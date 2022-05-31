import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState = {
  showLoginForm:0,
  showSignupForm:0,
  isVerified:0,
  userId:"",
  isLoggedIn:0,
  isSignedUp:0,
  right:0,
  wrong:0,
  message:'',
  gameover:0,
  activeCardsArr:[]
}

export const GlobalContext = createContext(initialState)
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  function setShowLoginForm(value) {
    dispatch({
      type: 'SHOW_LOGIN_FORM',
      payload: value
    })
  }
  function setShowSignupForm(value) {
    dispatch({
      type: 'SHOW_SIGNUP_FORM',
      payload: value
    })
  }
  function setIsVerified(value) {
    dispatch({
      type: 'IS_VERIFIED',
      payload: value
    })
  }
  function setUserId(value) {
    dispatch({
      type: 'USER_ID',
      payload: value
    })
  }
  function setIsSignedUp(value) {
    dispatch({
      type: 'IS_SIGNED_UP',
      payload: value
    })
  }
  function setIsLoggedIn(value) {
    dispatch({
      type: 'IS_LOGGED_IN',
      payload: value
    })
  }

  function setRight(value) {
      dispatch({
          type: 'SCORE_RIGHT',
          payload: value
      })
  }

  function setWrong(value) {
      dispatch({
          type: 'SCORE_WRONG',
          payload: value
      })
  }

  function setMessage(message) {
      dispatch({
          type: 'MESSAGE',
          payload: message
      })
  }

  function setGameover(value) {
      dispatch({
          type: 'GAMEOVER',
          payload: value
      })
  }

  function reset() {
      dispatch({
          type: 'RESET',
          payload: 0
      })
  }

  function setActiveCardsArr(arr) {
      dispatch({
          type: 'ACTIVE_CARDS',
          payload: arr
      })

  }

  return (<GlobalContext.Provider value={{
    showLoginForm:state.showLoginForm,
    showSignupForm:state.showSignupForm,
    isVerified:state.isVerified,
    userId:state.userId,
    isLoggedIn:state.isLoggedIn,
    isSignedUp:state.isSignedUp,
    right:state.right,
    wrong:state.wrong,
    message:state.message,
    gameover:state.gameover,
    activeCardsArr:state.activeCardsArr,
    setShowSignupForm,
    setShowLoginForm,
    setIsVerified,
    setUserId,
    setIsLoggedIn,
    setIsSignedUp,
    setRight,
    setWrong,
    setMessage,
    setGameover,
    reset,
    setActiveCardsArr
  }}>
  {children}
  </GlobalContext.Provider>)
}
