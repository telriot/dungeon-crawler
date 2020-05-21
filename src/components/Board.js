import React, { useContext } from "react"
import styles from "./Board.module.scss"
import { MapContext } from "../contexts/mapContext"
import { getSurroundings, getDirectionFromKey } from "../helpers"
import classNames from "classnames/bind"
import { CharacterContext } from "../contexts/characterContext"

function Board() {
  const { state, dispatch, GRID_HEIGHT, GRID_WIDTH } = useContext(MapContext)
  const { charState, charDispatch } = useContext(CharacterContext)

  let cx = classNames.bind(styles)

  const fight = (monster, cellIndex) => {
    console.log(`You fight a ${monster.name}`)
    const monsterHit = monster.strength + Math.round(Math.random() * 6)
    const weaponDamage = charState.weapons.length
      ? charState.weapons[0].strength
      : 0
    const charHit =
      weaponDamage + charState.strength + Math.round(Math.random() * 6)
    if (charHit < monster.hp) {
      console.log(`You dealt ${charHit} damage to a ${monster.name}`)
      dispatch({ type: "DAMAGE", damage: charHit, cell: cellIndex })
    } else {
      console.log(`You vanquished a ${monster.name}`)
      dispatch({ type: "KILL", cell: cellIndex })

      charDispatch({ type: "GET_XP", xp: monster.xp })
    }
    if (monsterHit < charState.hp) {
      console.log(`A ${monster.name} dealt you ${monsterHit} damage`)
      charDispatch({ type: "DAMAGE", damage: monsterHit })
    } else {
      console.log("GAME OVER")
      charDispatch({ type: "GAME_OVER" })
    }
  }
  const handleKeyPress = (e) => {
    const key = e.keyCode
    if (key === 38 || key === 40 || key === 39 || key === 37) {
      const surroundings = getSurroundings(
        state.characterPosition,
        state.map,
        GRID_WIDTH
      )
      const direction = getDirectionFromKey(e)
      const targetCell = surroundings[direction]
      const cellType = targetCell.type
      const cellIndex = targetCell.row * GRID_WIDTH + targetCell.col
      if (cellType === "floor" || cellType === "tunnel") {
        if (targetCell.monster) {
          const monster = targetCell.monster
          fight(monster, cellIndex)
        } else {
          dispatch({ type: "MOVE_CHARACTER", characterPosition: cellIndex })
        }
      } else if (cellType === "door") {
        dispatch({ type: "MOVE_CHARACTER", characterPosition: cellIndex })
      }
      //if "p"
    } else if (key === 80) {
      const currentCell = state.map[state.characterPosition]
      if (currentCell.item) {
        const item = currentCell.item
        if (item.type === "weapon") {
          const charWeapon = charState.weapons.length
            ? charState.weapons[0]
            : null
          dispatch({
            type: "DROP_ITEM",
            cell: state.characterPosition,
            item: charWeapon,
          })
          charWeapon && console.log(`You dropped a ${charWeapon.name}`)
          charDispatch({ type: "PICK_UP_WEAPON", item })
          console.log(`You picked up a ${item.name}`)
        } else {
          charDispatch({ type: "PICK_UP_ITEM", item })
          dispatch({ type: "REMOVE_ITEM", cell: state.characterPosition })
          console.log(`You picked up a ${item.name}`)
        }
      } else {
        console.log("There is nothing to pick up here")
      }
    }
  }

  const handleCellClick = (cell) => () => {
    cell.isVisible && console.log(cell)
  }
  const renderBoard = (map, height, width) => {
    let grid = []
    for (let row = 0; row < height; row++) {
      let thisRow = []
      for (let col = 0; col < width; col++) {
        const index = row * width + col
        let cellClass = cx({
          cell: true,
          character: index === state.characterPosition,
          wall: map[index].type === "wall",
          floor: map[index].type === "floor",
          corner: map[index].type === "corner",
          door: map[index].type === "door",
          border: map[index].type === "border",
          tunnel: map[index].type === "tunnel",
          wall: map[index].type === "wall",
          cellVisible: map[index].isVisible,
          monster: map[index].monster,
          item: map[index].item,
        })
        thisRow.push(
          <div
            key={`cell${index}`}
            className={cellClass}
            onDoubleClick={handleCellClick(map[index])}
          ></div>
        )
      }
      grid.push(
        <div key={`row${row}`} className={styles.row}>
          {thisRow}
        </div>
      )
    }
    return grid
  }
  return (
    <div className={styles.board} onKeyDown={handleKeyPress} tabIndex={-1}>
      {state.map.length
        ? renderBoard(state.map, GRID_HEIGHT, GRID_WIDTH)
        : null}
    </div>
  )
}

export default Board
