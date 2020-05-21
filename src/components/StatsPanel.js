import React, { useContext } from "react"
import styles from "./StatsPanel.module.scss"
import { CharacterContext } from "../contexts/characterContext"

function StatsPanel() {
  const { charState, charDispatch } = useContext(CharacterContext)
  const { hp, maxHp, xp, level, weapons, items } = charState
  return (
    <div className={styles.container}>
      <ul>
        <li>{`HP: ${hp}/${maxHp}`}</li>
        <li>{`XP: ${xp}`}</li>
        <li>{`Level: ${level}`}</li>
        <li>{`Weapons: ${weapons[0] ? weapons[0].name : "none"}`}</li>
        <li>{`Items: ${
          items[0] ? items.map((item) => item.name) : "none"
        }`}</li>
      </ul>
    </div>
  )
}

export default StatsPanel
