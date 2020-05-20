import React from "react"
import styles from "./Board.module.scss"
import { createDungeon } from "../map"

function Board() {
  const dungeon = createDungeon({
    gridHeight: 50,
    gridWidth: 50,
    minRooms: 10,
    maxRooms: 15,
    minRoomDimension: 5,
    maxRoomDimension: 10,
  })
  const renderBoard = (height, width) => {
    let grid = []
    for (let row = 0; row < height; row++) {
      let thisRow = []
      for (let col = 0; col < width; col++) {
        const index = row * width + col
        thisRow.push(
          <div
            key={`cell${index}`}
            className={
              dungeon[index].type === "wall"
                ? styles.wall
                : dungeon[index].type === "floor"
                ? styles.floor
                : dungeon[index].type === "corner"
                ? styles.corner
                : dungeon[index].type === "door"
                ? styles.door
                : dungeon[index].type === "border"
                ? styles.border
                : styles.cell
            }
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
  return <div>{renderBoard(50, 50)}</div>
}

export default Board
