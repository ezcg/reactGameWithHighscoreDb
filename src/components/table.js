import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import Card from './card'

let helpersBase = require('../helpers/base');

export default function Table () {

  const {
    activeCardsArr,
    setActiveCardsArr,
    reset,
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
    setShowSubmitScoreBtn
  } = useContext(GlobalContext);

  const [deckArr, setDeckArr] = useState(helpersBase.getDeckArr());

  function restart() {
    reset();
    let deckArr = helpersBase.getDeckArr();
    setDeckArr(deckArr);
  }

  async function submitScore() {
    let msg = await window.ScoreApp.sendScore(currentScore)
    setMessage(msg)
    setHighScore(currentScore)
    setShowSubmitScoreBtn(0)
  }

  function getCurrentScore(currentWrong, currentRight) {
    let currentScore
    if (currentWrong === 0) {
      //console.log("currentWrong", currentWrong)
      currentScore = 100
    } else {
      let val = currentRight / currentWrong * 100
      //console.log("val", val, "currentRight",currentRight, "currentWrong", currentWrong)
      currentScore = Math.round(val)
    }
    return currentScore
  }

  // Make sure the card clicked on is valid and then evaluate if 2 are currently clicked on
  function mngActiveCards(cardObj) {
    // Prevent clicking on the same card twice
    if (activeCardsArr.length === 1 && activeCardsArr[0]['rank'] === cardObj['rank'] && activeCardsArr[0]['suit'] === cardObj['suit']) {
      return;
    }
    // If any already matched card was clicked on, skip
    if (cardObj['suit'] === 'empty') {
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
      setRight(1);
      currentRight = 1 + right
      console.log("A currentRight", currentRight)
      if (currentRight === deckArr.length/2) {
        setMessage("VICTORY!!!");
        setGameover(1)
        let currentScore = getCurrentScore(currentWrong, currentRight)
        if (currentScore > highScore) {
          setShowSubmitScoreBtn(1)
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
      setWrong(1);
    }
    setActiveCardsArr([]);
    let currentScore = getCurrentScore(currentWrong, currentRight)
    setCurrentScore(currentScore)
    console.log("table.js currentScore", currentScore)
  }

  let restartBtnStyle = gameover ? {display:'block'} : {display:'none'};
  let submitScoreBtnStyle = showSubmitScoreBtn ? {display:"block"} : {display:"none"}

  return <div className="tableCont" key={"key_" + activeCardsArr.length}>
    <button className='restartBtn' style={restartBtnStyle} onClick={() => restart()}>Play Again?</button>
    <button className='submitScoreBtn' style={submitScoreBtnStyle} onClick = {() => submitScore()}>Submit Score</button>
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
