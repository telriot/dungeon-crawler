import React, { useContext } from "react"
import Character from "./Character"
import Item from "./Item"
import Monster from "./Monster"
import { CharacterContext } from "../contexts/characterContext"
import { MapContext } from "../contexts/mapContext"
import classNames from "classnames/bind"
import styles from "./Cell.module.scss"
import floor from "../media/floor.png"
import door from "../media/door.png"
import wall from "../media/wall.png"
import staircase from "../media/staircase.png"

let cx = classNames.bind(styles)

function Cell(props) {
  const { state } = useContext(MapContext)
  const { charDispatch } = useContext(CharacterContext)
  const { index } = props
  const cell = state.map[index]
  const { monster, item, type } = cell

  let cellClass = cx({
    cell: true,
    cellVisible: cell.isVisible || index === state.characterPosition,
  })

  const tileImg =
    type === "wall" || type === "corner" || type === "border"
      ? wall
      : type === "floor" || type === "tunnel"
      ? floor
      : type === "door"
      ? door
      : type === "staircase"
      ? staircase
      : wall

  const handleCellClick = (cell) => () => {
    const { monster, item } = cell
    if (cell.isVisible) {
      charDispatch({
        type: "LOG_MESSAGE",
        message: monster
          ? `You see a ${monster.name}`
          : item
          ? `You see a ${item.name}`
          : `There is nothing to see here`,
      })
    }
  }

  return (
    <div className={cellClass} onDoubleClick={handleCellClick(cell)}>
      <img className={styles.tileImg} src={tileImg} alt="cell" />
      {item ? <Item item={item} /> : null}
      {monster ? <Monster monster={monster} /> : null}
      {index === state.characterPosition ? <Character /> : null}
    </div>
  )
}

export default Cell
