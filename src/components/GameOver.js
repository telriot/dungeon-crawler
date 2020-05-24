import React, { useContext } from "react"
import { CharacterContext } from "../contexts/characterContext"
import { MapContext } from "../contexts/mapContext"
import styles from "./GameOver.module.scss"

function GameOver() {
  const { dispatch } = useContext(MapContext)
  const { charState, charDispatch } = useContext(CharacterContext)
  const handleClickYes = () => {
    dispatch({ type: "SET_MAP" })
    charDispatch({ type: "NEW_GAME" })
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        {charState.win ? "You won!" : "Game Over"}
      </h3>
      <p className={styles.text}>
        {charState.win
          ? "But to me, that was luck. Try again?"
          : "Give it another try?"}
      </p>
      <div className={styles.buttonDiv}>
        <button className={styles.button} onClick={handleClickYes}>
          Yes
        </button>
        <button className={styles.button}>
          <a href="https://www.youtube.com/watch?v=ub82Xb1C8os">No</a>
        </button>
      </div>
    </div>
  )
}

export default GameOver
