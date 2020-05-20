import React from "react"
import styles from "./App.module.scss"
import Board from "./Board"

function App() {
  return (
    <div className={styles.container}>
      <Board />
    </div>
  )
}

export default App
