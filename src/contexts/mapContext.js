import React, { useReducer, createContext, useEffect } from "react"
import { TYPES } from "./types"
import { createDungeon } from "../map"
import { getRandomCellType, revealCells, nestedCopy } from "../helpers"

const GRID_HEIGHT = 35
const GRID_WIDTH = 35
const MIN_ROOMS = 5
const MAX_ROOMS = 8
const MIN_ROOM_DIMENSION = 5
const MAX_ROOM_DIMENSION = 10
const MIN_STEP_LENGTH = 2
const MAX_STEP_LENGTH = 15

const initialState = {
  map: [],
  characterPosition: 0,
}
export const MapContext = createContext(initialState)

const MapContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      case TYPES.SET_MAP:
        return {
          ...state,
          map: action.map,
          characterPosition: action.characterPosition,
        }
      case TYPES.MOVE_CHARACTER:
        return {
          ...state,
          characterPosition: action.characterPosition,
        }
      case TYPES.SET_VISIBLE_CELLS:
        return {
          ...state,
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
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
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
    const placement = getRandomCellType("floor", map)
    dispatch({
      type: "SET_MAP",
      map: nestedCopy(map),
      characterPosition: placement,
    })
  }, [])
  useEffect(() => {
    if (state.map.length) {
      const updatedMap = revealCells(
        state.map,
        state.characterPosition,
        GRID_WIDTH
      )
      dispatch({ type: "SET_VISIBLE_CELLS", map: nestedCopy(updatedMap) })
    }
  }, [state.characterPosition])
  return (
    <MapContext.Provider value={{ state, dispatch, GRID_HEIGHT, GRID_WIDTH }}>
      {children}
    </MapContext.Provider>
  )
}

export default MapContextProvider
