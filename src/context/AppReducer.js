let reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_LOGIN_FORM':
      return {
        ...state,
        showLoginForm:action.payload
      }
    case 'SHOW_SIGNUP_FORM':
      return {
        ...state,
        showSignupForm:action.payload
      }
    case 'IS_VERIFIED':
      return {
        ...state,
        isVerified:action.payload
      }
    case 'USER_ID':
      return {
        ...state,
        userId: action.payload
      }
    case 'IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.payload
      }
    case 'IS_SIGNED_UP':
      return {
        ...state,
        isSignedUp: action.payload
      }
    case 'SCORE_RIGHT':
      return {
        ...state,
        right: state.right + action.payload
      }
    case 'SCORE_WRONG':
      return {
        ...state,
        wrong: state.wrong + action.payload
      }
    case 'MESSAGE':
      return {
        ...state,
        message: action.payload
      }
    case 'GAMEOVER':
      return {
        ...state,
        gameover: action.payload
      }
    case 'RESET':
      return {
        ...state,
        gameover: 0,
        message: '',
        right:0,
        wrong:0
      }
    case 'ACTIVE_CARDS':
      return {
        ...state,
        activeCardsArr:action.payload
      }

    default: return state
  }
}

export default reducer
