import React, {useContext} from 'react'
import {GlobalContext} from "../context/GlobalState";

let Base = require('../helpers/base.js');

export default function Card ({cardObj}) {

    const { activeCardsArr } = useContext(GlobalContext);

    let rank = cardObj['rank'];
    let suit = cardObj['suit'];

    let displayed = 'cover';
    if (activeCardsArr[0] && activeCardsArr[0]['rank'] === rank && activeCardsArr[0]['suit'] === suit) {
        displayed = 'face';
    }
    if (activeCardsArr[1] && activeCardsArr[1]['rank'] === rank && activeCardsArr[1]['suit'] === suit) {
        displayed = 'face';
    }
    let key =  rank + "_" + suit + "_" + displayed;

    let displayCard = '';
    if (suit === 'correctcheckmark') {
        displayCard = '&#10004;';
    } else if (displayed === 'cover') {
        displayCard = "<span style='color:black'>ezCG</span>";
    } else {
        let rankDisplay = Base.convertRank(rank);
        let htmlSuit = '&spades;';
        if (suit === 'heart') {
            htmlSuit = '&hearts;';
        } else if (suit === 'diamond') {
            htmlSuit = '&diams;';
        } else if (suit === 'club') {
            htmlSuit = '&clubs;';
        }
        displayCard = rankDisplay + '<br />' + htmlSuit;
    }

    return <div key={key} className={`card ${suit}`}>
        <div dangerouslySetInnerHTML={{ __html: displayCard}} />
        <div className="cb"></div>
    </div>

}
