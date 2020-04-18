import React, { Component } from "react"
import ReactDOM from "react-dom"
import Header from './Header'
import LastPlayedCard from './LastPlayedCard'
import PlayerDeck from './PlayerDeck'

const dataRefreshInterval = 5000;

class PlayerView extends Component
{
  constructor(props)
  {
    super(props);
    this.state = undefined;
    this.onCardPlayed = this.onCardPlayed.bind(this);
    this.fetchDataAndUpdate = this.fetchDataAndUpdate.bind(this);
    this.startDataRefresh = this.startDataRefresh.bind(this);
    this.stopDataRefresh = this.stopDataRefresh.bind(this);
  }

  onCardPlayed(AppData)
  {
    this.stopDataRefresh();
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
      //startNewRound();
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

    this.startDataRefresh();
  }

  componentDidMount()
  {
    this.fetchDataAndUpdate();
    this.startDataRefresh();
  }

  fetchDataAndUpdate()
  {
    let obj = this;
    fetch('/getRawAppData').then(response => response.json())
      .then(data => {
        obj.setState(data);
      });
  }

  startDataRefresh()
  {
    this.timerId = setInterval(this.fetchDataAndUpdate, dataRefreshInterval);
  }

  stopDataRefresh()
  {
    clearInterval(this.timerId);
  }

  render()
  {
    return <>
    <Header />
    <LastPlayedCard AppData = { this.state } />
    <PlayerDeck AppData = { this.state } onCardPlayed = { this.onCardPlayed } stopDataRefresh = { this.stopDataRefresh } selectedPlayer = { this.props.selectedPlayer } />
    </>
  }
}

ReactDOM.render(<PlayerView selectedPlayer = { document.getElementById('selectedplayer').value } />, document.getElementById("root"));