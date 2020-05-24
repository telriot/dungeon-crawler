import React, { useReducer, createContext, useEffect } from "react"
import { TYPES } from "./types"
import { createDungeon, createBossMap } from "../map"
import { getRandomCellType, revealCells } from "../helpers"

const GRID_HEIGHT = 70
const GRID_WIDTH = 70
const MIN_ROOMS = 30
const MAX_ROOMS = 40
const MIN_ROOM_DIMENSION = 5
const MAX_ROOM_DIMENSION = 10
const MIN_STEP_LENGTH = 2
const MAX_STEP_LENGTH = 30

const initialState = {
  map: [],
  bossMap: false,
  characterPosition: 0,
}
export const MapContext = createContext(initialState)

const MapContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      case TYPES.SET_MAP:
        const map = createDungeon({
          gridHeight: GRID_HEIGHT,
          gridWidth: GRID_WIDTH,
          minRooms: MIN_ROOMS,
          maxRooms: MAX_ROOMS,
          minRoomDimension: MIN_ROOM_DIMENSION,
          maxRoomDimension: MAX_ROOM_DIMENSION,
          stepMinLength: MIN_STEP_LENGTH,
          stepMaxLength: MAX_STEP_LENGTH,
        })
        const placement = getRandomCellType("floor", map, "monster")
        const revealedMap = revealCells(map, placement, GRID_WIDTH)

        return {
          ...state,
          bossMap: false,
          map: revealedMap,
          characterPosition: placement,
        }

      case TYPES.MOVE_CHARACTER:
        return {
          ...state,
          characterPosition: action.characterPosition,
          map: action.map,
        }
      case TYPES.DAMAGE:
        return {
          ...state,
          map: [
            ...state.map,
            (state.map[action.cell] = {
              ...state.map[action.cell],
              monster: {
                ...state.map[action.cell].monster,
                hp: state.map[action.cell].monster.hp - action.damage,
              },
            }),
          ],
        }
      case TYPES.KILL:
        return {
          ...state,
          map: [
            ...state.map,
            (state.map[action.cell] = {
              ...state.map[action.cell],
              monster: null,
            }),
          ],
        }
      case TYPES.DROP_ITEM:
        return {
          ...state,
          map: [
            ...state.map,
            (state.map[action.cell] = {
              ...state.map[action.cell],
              item: action.item,
            }),
          ],
        }
      case TYPES.REMOVE_ITEM:
        return {
          ...state,
          map: [
            ...state.map,
            (state.map[action.cell] = {
              ...state.map[action.cell],
              item: null,
            }),
          ],
        }
      case TYPES.GO_TO_BOSS_MAP:
        let newMap = createBossMap()
        const newPlacement = 50
        let newRevealedMap = revealCells(newMap, newPlacement, 15)
        return {
          ...state,
          map: newRevealedMap,
          bossMap: true,
          characterPosition: newPlacement,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    dispatch({
      type: "SET_MAP",
    })
  }, [])

  return (
    <MapContext.Provider value={{ state, dispatch, GRID_HEIGHT, GRID_WIDTH }}>
      {children}
    </MapContext.Provider>
  )
}

export default MapContextProvider
