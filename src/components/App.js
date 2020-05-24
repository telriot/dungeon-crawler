import React, { useContext } from "react"
import Board from "./Board"
import GameOver from "./GameOver"
import Header from "./Header"
import Instructions from "./Instructions"
import LogPanel from "./LogPanel"
import NewGame from "./NewGame"
import StatsPanel from "./StatsPanel"
import MapContextProvider from "../contexts/mapContext"
import { CharacterContext } from "../contexts/characterContext"
import styles from "./App.module.scss"

function App() {
  const { charState } = useContext(CharacterContext)
  return (
    <div className={styles.container}>
      <Header />
      <MapContextProvider>
        {!charState.isPlaying ? (
          <NewGame />
        ) : charState.isGameOver ? (
          <GameOver />
        ) : (
          <Board />
        )}
        <StatsPanel />
        <LogPanel />
      </MapContextProvider>
      <Instructions />
    </div>
  )
}

export default App
