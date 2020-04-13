import React from "react"
import ReactDOM from "react-dom"
import Header from './Header'
import LastPlayedCard from './LastPlayedCard'
import PlayerDeck from './PlayerDeck'

const App = () =>
( <>
  <Header />
  <LastPlayedCard />
  <PlayerDeck />
  </>
)

ReactDOM.render(<App />, document.getElementById("root"))