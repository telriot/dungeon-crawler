import React from "react"
import styles from "./Cell.module.scss"
import human from "../media/human.png"
function Item() {
  return <img className={styles.characterImg} src={human} alt="character" />
}

export default Item
