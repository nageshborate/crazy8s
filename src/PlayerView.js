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

  onCardPlayed()
  {
    this.stopDataRefresh();
    const { 
      changeTurns, 
      checkRoundComplete, 
      calculatePlayerPoints
    } = require('../AppDataMethods').getAppDataMethods(AppData);

    changeTurns();

    if (checkRoundComplete())
    {
      calculatePlayerPoints();
    }

    this.setState({test: new Date().getTime()});
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
        AppData = data; 
        obj.setState({test: new Date().getTime()});
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
    <LastPlayedCard />
    <hr />
    <PlayerDeck onCardPlayed = { this.onCardPlayed } stopDataRefresh = { this.stopDataRefresh } selectedPlayer = { this.props.selectedPlayer } />
    <br />
    <PointsTableDialog />
    </>
  }
}

ReactDOM.render(<PlayerView selectedPlayer = { document.getElementById('selectedplayer').value } />, document.getElementById("root"));