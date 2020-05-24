import React, { useContext, useState } from "react"
import { MapContext } from "../contexts/mapContext"
import { CharacterContext } from "../contexts/characterContext"
import Cell from "./Cell"
import { revealCells, fight, pickUp, consumeItem } from "../helpers"
import { MobileView } from "react-device-detect"
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa"
import styles from "./Board.module.scss"

function Board() {
  const { state, dispatch, GRID_HEIGHT, GRID_WIDTH } = useContext(MapContext)
  const { charState, charDispatch } = useContext(CharacterContext)

  const [running, setRunning] = useState(false)

  const handleKeyPress = (e) => {
    const click = e.currentTarget.dataset.direction
    const key = e.keyCode
    const { map, characterPosition } = state
    const width = state.bossMap ? 15 : GRID_WIDTH
    //if arrows
    let targetCell
    if (key === 38 || click === "up") {
      targetCell = map[characterPosition - width]
    } else if (key === 40 || click === "down") {
      targetCell = map[characterPosition + width]
    } else if (key === 39 || click === "right") {
      targetCell = map[characterPosition + 1]
    } else if (key === 37 || click === "left") {
      targetCell = map[characterPosition - 1]
    }
    if (targetCell) {
      if (running === key) return null
      if (running) setRunning(null)
      const updatedMap = revealCells(state.map, state.characterPosition, width)
      const cellType = targetCell.type
      const cellIndex = targetCell.row * width + targetCell.col
      if (cellType === "floor" || cellType === "tunnel") {
        if (targetCell.monster) {
          const monster = targetCell.monster
          fight({ monster, cellIndex, dispatch, charState, charDispatch })
        } else {
          dispatch({
            type: "MOVE_CHARACTER",
            characterPosition: cellIndex,
            map: updatedMap,
          })
        }
      } else if (cellType === "door") {
        dispatch({
          type: "MOVE_CHARACTER",
          characterPosition: cellIndex,
          map: updatedMap,
        })
      } else if (cellType === "staircase") {
        dispatch({
          type: "GO_TO_BOSS_MAP",
        })
      }
      setRunning(key)
      setTimeout(() => setRunning(false), 100)
    }
    //if Enter
    else if (key === 13) {
      pickUp({ state, charState, dispatch, charDispatch })
      //if 1,2,3,4
    } else if (key === 49) {
      charState.items[0] && consumeItem(charState.items[0], 0, charDispatch)
    } else if (key === 50) {
      charState.items[1] && consumeItem(charState.items[1], 1, charDispatch)
    } else if (key === 51) {
      charState.items[2] && consumeItem(charState.items[2], 2, charDispatch)
    } else if (key === 52) {
      charState.items[3] && consumeItem(charState.items[3], 3, charDispatch)
    }
  }

  const renderBoard = (map, height, width, characterPosition) => {
    const viewPortWidth = 7
    const viewPortHeight = 7
    let currentRow =
      Math.floor(characterPosition / width) <= viewPortHeight
        ? viewPortHeight
        : Math.floor(characterPosition / width) >= height - viewPortHeight
        ? height - viewPortHeight - 1
        : Math.floor(characterPosition / width)
    let currentCol =
      characterPosition % width <= viewPortWidth
        ? viewPortWidth
        : characterPosition % width >= width - viewPortWidth
        ? width - viewPortWidth - 1
        : characterPosition % width

    let grid = []
    for (let row = 0; row < height; row++) {
      if (
        row >= currentRow - viewPortHeight &&
        row <= currentRow + viewPortHeight
      ) {
        let thisRow = []
        for (let col = 0; col < width; col++) {
          if (
            col >= currentCol - viewPortWidth &&
            col <= currentCol + viewPortWidth
          ) {
            const index = row * width + col
            thisRow.push(
              <Cell key={`Cell-${index}`} index={index} cell={map[index]} />
            )
          } else continue
        }
        grid.push(
          <div key={`row${row}`} className={styles.row}>
            {thisRow}
          </div>
        )
      } else {
        continue
      }
    }
    return grid
  }
  return (
    <>
      <div className={styles.board} onKeyDown={handleKeyPress} tabIndex={-1}>
        {state.map.length && state.bossMap === false
          ? renderBoard(
              state.map,
              GRID_HEIGHT,
              GRID_WIDTH,
              state.characterPosition
            )
          : state.map.length && state.bossMap
          ? renderBoard(state.map, 15, 15, state.characterPosition)
          : null}
        <MobileView>
          <div
            onClick={handleKeyPress}
            data-direction="up"
            className={styles.chevronUp}
          >
            <FaChevronUp />
          </div>
          <div
            className={styles.chevronDown}
            onClick={handleKeyPress}
            data-direction="down"
          >
            <FaChevronDown />
          </div>
          <div
            className={styles.chevronLeft}
            onClick={handleKeyPress}
            data-direction="left"
          >
            <FaChevronLeft />
          </div>
          <div
            className={styles.chevronRight}
            onClick={handleKeyPress}
            data-direction="right"
          >
            <FaChevronRight />
          </div>
        </MobileView>
      </div>
    </>
  )
}

export default Board

/*FOR TESTING FULL MAP
  const renderBoard2 = (map, height, width) => {
    let grid = []
    for (let row = 0; row < height; row++) {
      let thisRow = []
      for (let col = 0; col < width; col++) {
        const index = row * width + col
        thisRow.push(
          <Cell key={`Cell-${index}`} index={index} cell={map[index]} />
        )
      }
      grid.push(
        <div key={`row${row}`} className={styles.row}>
          {thisRow}
        </div>
      )
    }

    return grid
  }*/
