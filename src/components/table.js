import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import Card from './card'

let Utilities = require("../helpers/utilities")

export default function Table () {

  const {
    deckArr,
    isLoggedIn,
    activeCardsArr,
    setActiveCardsArr,
    setReset,
    wrong,
    setWrong,
    right,
    setRight,
    setMessage,
    gameover,
    setGameover,
    currentScore,
    setCurrentScore,
    highScore,
    setHighScore,
    showSubmitScoreBtn,
    setShowSubmitScoreBtn,
    showSpinner,
    setShowSpinner,
    level,
    setLevel,
    nextLevel,
    setNextLevel,
    nextLevelReady,
    setNextLevelReady,
    setDeckArr,
    totalScore,
    setTotalScore
  } = useContext(GlobalContext);

  function restart() {
    setReset(1);
  }

  function startNextLevel() {
    console.log("startNextLevel() level:", level)
    setTotalScore(currentScore + totalScore)
    setRight(0)
    setWrong(0)
    setCurrentScore(0)
    setMessage("")
    setNextLevelReady(0)
    setDeckArr(Utilities.getDeckArr(level))
  }

  async function submitScore() {
    setShowSpinner(1)
    let msg = await window.ScoreApp.sendScore(currentScore)
    setShowSpinner(0)
    setMessage(msg)
    setHighScore(currentScore)
    setShowSubmitScoreBtn(0)
  }

  function getCurrentScore(currentWrong, currentRight) {
    let currentScore
    currentScore = currentRight * 100 - currentWrong * 20
    return currentScore
  }

  // Make sure the card clicked on is valid and then evaluate if 2 are currently clicked on
  function mngActiveCards(cardObj) {
    // Prevent clicking on the same card twice
    if (activeCardsArr.length === 1 && activeCardsArr[0]['rank'] === cardObj['rank'] && activeCardsArr[0]['suit'] === cardObj['suit']) {
      return;
    }
    // If any already matched card was clicked on, skip
    if (cardObj['suit'] === 'empty' || cardObj['suit'] === 'correctcheckmark') {
      return;
    }
    // Prevent clicking on a third card while the previous 2 cards are evaluated
    if (activeCardsArr.length === 2) {
      return;
    }
    // If this is the second click, the second card clicked on has not been added to the activeCardsArr yet.
    if (activeCardsArr.length < 2) {
      let tmpActiveCardsArr = [...activeCardsArr, cardObj];
      setActiveCardsArr(tmpActiveCardsArr);
      if (tmpActiveCardsArr.length === 2) {
        setTimeout(evaluatePicks, 700, tmpActiveCardsArr);
      }
    }
  }

  // Evaluate if the 2 cards clicked on match, set score, messaging, set activeCardsArr to empty
  function evaluatePicks(activeCardsArr) {
    let currentRight = right
    let currentWrong = wrong
    if (activeCardsArr[0]['rank'] === activeCardsArr[1]['rank']) {
      currentRight = 1 + right
      setRight(currentRight);
      if (currentRight === deckArr.length/2) {
        if (level === 4) {
          setGameover(1)
          let currentScore = getCurrentScore(currentWrong, currentRight)
          if (currentScore > 0 && !isLoggedIn) {
            setMessage("You won with a score of " + currentScore + "!")
          } else if (currentScore <= 0) {
            setMessage("Your score must be greater than 0 to be able to submit it to the high score table.")
          } else if (currentScore > highScore && isLoggedIn) {
            setShowSubmitScoreBtn(1)
            if (highScore > 0) {
              setMessage("You beat your high score of " + highScore + "!")
            }
          } else if (isLoggedIn && currentScore <= highScore) {
            setMessage("You didn't beat your high score of " + highScore + ".")
          }
        } else {
          setNextLevelReady(1)
          setMessage("Level " + level + " completed! Next level: " + Number(level + 1))
          setLevel(level + 1)
        }
      }
      deckArr.forEach((cardObj, i) => {
        // set the 'correct checkmark' to be displayed if the rank and suit between the 2 active cards are the same
        if (cardObj['rank'] === activeCardsArr[0]['rank'] && cardObj['suit'] === activeCardsArr[0]['suit']) {
           deckArr[i]['suit'] = 'correctcheckmark';
        } else if (cardObj['rank'] === activeCardsArr[1]['rank'] && cardObj['suit'] === activeCardsArr[1]['suit']) {
          deckArr[i]['suit'] = 'correctcheckmark';
        }
      });
    } else {
      currentWrong = 1 + wrong
      setWrong(currentWrong);
    }
    setActiveCardsArr([]);
    let currentScore = getCurrentScore(currentWrong, currentRight)
    setCurrentScore(currentScore)
  }

  let restartBtnStyle = gameover ? {display:'block'} : {display:'none'};
  let submitScoreBtnStyle = showSubmitScoreBtn ? {display:"block"} : {display:"none"}
  let spinnerStyle = showSpinner ? {display:"block"} : {display:"none"}
  let nextLevelBtnStyle = nextLevelReady ? {display:"block"} : {display:"none"}

  console.log("body level", level)

  return <div className="tableCont" key={"key_" + activeCardsArr.length}>
    <div style={spinnerStyle} className="lds-default">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <span className='scoreBtn' style={restartBtnStyle} onClick={() => restart()}>Play Again?</span>
    <span className='scoreBtn' style={nextLevelBtnStyle} onClick={() => startNextLevel(1)}>Start Next Level?</span>
    <span className='scoreBtn' style={submitScoreBtnStyle} onClick = {() => submitScore()}>Submit Score</span>
    <div className="cb"></div>
    {deckArr.map((cardObj, i) => {
      return <div className="cardCont" key={i+ '_'+ cardObj['suit']} onClick={() => mngActiveCards(cardObj)}>
        <Card cardObj={cardObj} />
        <div className="cb"></div>
      </div>
    })}
    <div style={{clear:'both'}}></div>
  </div>

}
