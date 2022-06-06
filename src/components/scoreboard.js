import React, {useContext} from "react";
import {GlobalContext} from "../context/GlobalState";

export default function Scoreboard () {

  const { wrong, right, isLoggedIn, highScore, currentScore, level } = useContext(GlobalContext);

  return (
    <div className="headerCont" key={wrong + "_" + right + "_" + currentScore}>
      <div className="scoreCont">
        <span className="scoreCorrect">{right}</span>
        <span className="scoreWrong">{wrong}</span>
        <span className = "equalsSymbol">Score:</span>
        <span className = "currentScore">{currentScore}</span>
        <span className = "equalsSymbol">Level:</span>
        <span className = "currentScore">{level}</span>
        <div className="cb"></div>
      </div>
      <div className="highScoreCont">
        High Score:&nbsp;
        {isLoggedIn === 1 && highScore}
        {isLoggedIn === 0 && "Login/Signup to save it!"}
        <div className="cb"></div>
      </div>
    </div>
  )

}
