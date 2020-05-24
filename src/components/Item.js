import React from "react"
import { itemImg } from "../helpers"
import styles from "./Cell.module.scss"

function Item(props) {
  const { item } = props
  return (
    <img className={styles.itemImg} src={itemImg(item.name)} alt="character" />
  )
}

export default Item
