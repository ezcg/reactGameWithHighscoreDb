import React, {useContext} from "react";
import {GlobalContext} from "../context/GlobalState";

export default function Scoreboard () {

  const { wrong, right, isLoggedIn, highScore, currentScore } = useContext(GlobalContext);

  let highScoreContStyle = {width:'280px'}
  if (!isLoggedIn) {
    highScoreContStyle = {width:'350px'}
  }

  return (
    <div className="headerCont" key={wrong + "_" + right + "_" + currentScore}>
      <div className="scoreCont">
        <div className="scoreCorrect">{right}</div>
        <div className = "divisorSymbol">/</div>
        <div className="scoreWrong">{wrong}</div>
        <div className = "equalsSymbol">=</div>
        <div className = "currentScore">{currentScore}</div>
        <div className="cb"></div>
      </div>
      <div className="highScoreCont" style={highScoreContStyle}>
        High Score:&nbsp;
        {isLoggedIn === 1 && highScore}
        {isLoggedIn === 0 && "Login/Signup to save it!"}
        <div className="cb"></div>
      </div>
    </div>
  )

}
