import React, { useContext } from "react"
import styles from "./LogPanel.module.scss"
import { CharacterContext } from "../contexts/characterContext"

function LogPanel() {
  const { charState } = useContext(CharacterContext)
  const { isPlaying } = charState

  return (
    <div
      className={styles.container}
      style={!isPlaying ? { opacity: "0.4" } : null}
    >
      {charState.log
        .map((message, index) => (
          <p
            key={`log-message-${index}`}
            className={
              index === charState.log.length - 1
                ? styles.message
                : styles.messageOld
            }
          >
            {message}
          </p>
        ))
        .reverse()}
    </div>
  )
}

export default LogPanel
