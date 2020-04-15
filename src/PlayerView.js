import React from "react"
import ReactDOM from "react-dom"
import Header from './Header'
import LastPlayedCard from './LastPlayedCard'
import PlayerDeck from './PlayerDeck'

const PlayerView = () =>
( <>
  <Header />
  <LastPlayedCard />
  <PlayerDeck />
  </>
)

ReactDOM.render(<PlayerView />, document.getElementById("root"))