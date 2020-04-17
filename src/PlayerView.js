import React, { Component } from "react"
import ReactDOM from "react-dom"
import Header from './Header'
import LastPlayedCard from './LastPlayedCard'
import PlayerDeck from './PlayerDeck'

class PlayerView extends Component
{
  constructor(props)
  {
    super(props);
    this.state = undefined;
    this.onCardPlayed = this.onCardPlayed.bind(this);
  }

  onCardPlayed(AppData)
  {
    const { 
      changeTurns, 
      checkRoundComplete, 
      calculatePlayerPoints, 
      startNewRound, 
      isDiscardPileEmpty, 
      generateDiscardPileWithoutPlayerCards 
    } = require('../AppDataMethods').getAppDataMethods(AppData);

    changeTurns();

    if (checkRoundComplete())
    {
      calculatePlayerPoints();
      startNewRound();
    }
    else
    {
      if (isDiscardPileEmpty())
      {
        generateDiscardPileWithoutPlayerCards();
      }
    }

    this.setState(AppData);
    fetch('/updateRawAppData', 
    {
      method: 'POST',
      body: JSON.stringify(AppData),
      headers:
      {
        'Content-Type': 'application/json'
      }
    });
  }

  componentDidMount()
  {
    let obj = this;
    let fetchDataAndUpdate = function()
    {
      fetch('/getRawAppData').then(response => response.json())
        .then(data => {
          obj.setState(data);
        });
    };
    setInterval(fetchDataAndUpdate, 5000);
    fetchDataAndUpdate();
  }

  render()
  {
    return <>
    <Header />
    <LastPlayedCard AppData = { this.state } />
    <PlayerDeck AppData = { this.state } onCardPlayed = { this.onCardPlayed } selectedPlayer = { this.props.selectedPlayer } />
    </>
  }
}

ReactDOM.render(<PlayerView selectedPlayer = { document.getElementById('selectedplayer').value } />, document.getElementById("root"));