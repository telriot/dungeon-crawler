import React, { useReducer, createContext, useEffect } from "react"
import { TYPES } from "./types"
const XP_LEVELS = [0, 25, 60, 120, 240, 500, 900, 1500]
const initialState = {
  name: "Gavrosti",
  position: undefined,
  maxHp: 80,
  hp: 50 + Math.round(Math.random() * 30),
  xp: 0,
  level: 1,
  items: [],
  weapons: [],
  strength: 3 + Math.round(Math.random() * 3),
}
export const CharacterContext = createContext(initialState)

const CharacterContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      case TYPES.DAMAGE:
        return {
          ...state,
          hp: state.hp - action.damage,
        }
      case TYPES.GET_XP:
        return {
          ...state,
          xp: state.xp + action.xp,
        }
      case TYPES.LEVEL_UP:
        return {
          ...state,
          level: state.level++,
          maxHp: state.maxHp + state.level * Math.round(Math.random() * 6),
          hp: state.maxHp,
          strength: state.strength + Math.floor(Math.random() * 3),
        }
      case TYPES.PICK_UP_WEAPON:
        return {
          ...state,
          weapons: [action.item],
        }
      case TYPES.PICK_UP_ITEM:
        return {
          ...state,
          items: [...state.items, action.item],
        }
      default:
        return state
    }
  }
  const [charState, charDispatch] = useReducer(appReducer, initialState)
  useEffect(() => {
    for (let i = charState.level; i < XP_LEVELS.length; i++) {
      if (charState.xp >= XP_LEVELS[i]) {
        charDispatch({ type: "LEVEL_UP" })
        break
      }
    }
  }, [charState.xp])

  return (
    <CharacterContext.Provider value={{ charState, charDispatch }}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterContextProvider
