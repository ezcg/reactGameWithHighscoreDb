let Utilities = require("../helpers/utilities")

let reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_SPINNER':
      return {
        ...state,
        showSpinner:action.payload
      }
    case 'SHOW_VERIFY_FORM':
      return {
        ...state,
        showVerifyForm:action.payload
      }
    case 'EMAIL_VERIFIED':
      return {
        ...state,
        emailVerified:action.payload
      }
    case 'EMAIL_UNVERIFIED':
      return {
        ...state,
        emailUnverified:action.payload
      }
    case 'PASSWORD_VERIFIED':
      return {
        ...state,
        passwordVerified:action.payload
      }
    case 'PASSWORD_UNVERIFIED':
      return {
        ...state,
        passwordUnverified:action.payload
      }
    case 'SHOW_SUBMIT_SCORE_BTN':
      return {
        ...state,
        showSubmitScoreBtn:action.payload
      }
    case 'CURRENT_SCORE':
      return {
        ...state,
        currentScore:action.payload
      }
    case 'HIGH_SCORE':
      return {
        ...state,
        highScore:action.payload
      }
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
    case 'ACTIVE_CARDS_ARR':
      return {
        ...state,
        activeCardsArr:action.payload
      }
    case 'NEXT_LEVEL_READY':
      return {
        ...state,
        nextLevelReady:action.payload
      }
    case 'LEVEL':
      return {
        ...state,
        level:action.payload
      }
    case 'DECK_ARR':
      return {
        ...state,
        deckArr:action.payload
      }
    case 'RESET':
      return {
        ...state,
        level:1,
        nextLevelReady:0,
        deckArr:Utilities.getDeckArr(0),
        activeCardsArr:[],
        gameover: 0,
        message: '',
        right:0,
        wrong:0,
        currentScore:0,
        showSubmitScoreBtn:0,
        emailVerified:"",
        emailUnverified:'',
        passwordVerified:'',
        passwordUnverified:'',
        showVerifyForm:0,
        showSpinner:0
      }
    default: return state
  }
}

export default reducer
