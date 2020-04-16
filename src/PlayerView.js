import React, { useState } from "react"
import ReactDOM from "react-dom"
import Header from './Header'
import LastPlayedCard from './LastPlayedCard'
import PlayerDeck from './PlayerDeck'
const AppDataMethods = require('../AppDataMethods').getAppDataMethods(AppData);

const PlayerView = () =>
{ 
  const [, updateDummyState] = useState({});

  const onCardPlayed = function()
  {
    AppDataMethods.changeTurns();
    updateDummyState({});
    fetch('/updateRawAppData', 
    {
      method: 'POST',
      body: JSON.stringify(AppData),
      headers:
      {
        'Content-Type': 'application/json'
      }
    });
  };

  return <>
  <Header />
  <LastPlayedCard />
  <PlayerDeck onCardPlayed = { onCardPlayed } />
  </>
}

ReactDOM.render(<PlayerView />, document.getElementById("root"))