import React from "react"
import styles from "./App.module.scss"
import Board from "./Board"
import MapContextProvider from "../contexts/mapContext"
import StatsPanel from "./StatsPanel"

function App() {
  return (
    <div className={styles.container}>
      <MapContextProvider>
        <Board />
        <StatsPanel />
      </MapContextProvider>
    </div>
  )
}

export default App
