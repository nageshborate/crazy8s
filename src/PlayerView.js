import React, { Component } from "react"
import ReactDOM from "react-dom"
import Header from './Header'
import LastPlayedCard from './LastPlayedCard'
import PlayerDeck from './PlayerDeck'
import PointsTableDialog from './PointsTableDialog'

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
    /*else
    {
      if (isDiscardPileEmpty())
      {
        //generateDiscardPileWithoutPlayerCards();
        /*fetch('/generateDiscardPileWithoutPlayerCards', 
        {
          method: 'POST',
          body: JSON.stringify(AppData),
          headers:
          {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
        .then(data => {
          AppData = data;
        });


        (async () => {
          const response = await fetch('/generateDiscardPileWithoutPlayerCards', 
          {
            method: 'POST',
            body: JSON.stringify(AppData),
            headers:
            {
              'Content-Type': 'application/json'
            }
          });
          const json = await response.json();
          console.log(json);
          AppData = json;
      })();


      }
    }*/

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
    this.fetchDataAndUpdate();
  }

  stopDataRefresh()
  {
    clearInterval(this.timerId);
  }

  render()
  {
    if (!(this.state))
        return null;

    return <>
    <Header />
    <LastPlayedCard AppData = { this.state } />
    <hr />
    <PlayerDeck AppData = { this.state } onCardPlayed = { this.onCardPlayed } stopDataRefresh = { this.stopDataRefresh } selectedPlayer = { this.props.selectedPlayer } />
    <br />
    <PointsTableDialog AppData = { this.state } />
    </>
  }
}

ReactDOM.render(<PlayerView selectedPlayer = { document.getElementById('selectedplayer').value } />, document.getElementById("root"));