import React from "react"
import styles from "./Instructions.module.scss"
function Instructions() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Use arrows to move, "Enter" to pick up items and "1" "2" "3" and "4" to
        use them.
      </p>
      <p className={styles.text}>
        Will you find and defeat Kogetaro, King of the Cats?
      </p>
    </div>
  )
}

export default Instructions
