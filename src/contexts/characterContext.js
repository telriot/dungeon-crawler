import React, { useReducer, createContext, useEffect } from "react"
import { TYPES } from "./types"
import { getArticle } from "../helpers"

const XP_LEVELS = [
  0,
  25,
  60,
  120,
  240,
  500,
  750,
  1000,
  1300,
  1650,
  2000,
  2500,
  3000,
  4000,
  5000,
  7000,
  10000,
]
const initialState = {
  isPlaying: false,
  gameOver: false,
  won: false,
  name: "",
  maxHp: 80,
  hp: 50 + Math.round(Math.random() * 30),
  xp: 0,
  level: 1,
  items: [],
  weapons: [],
  strength: 3 + Math.round(Math.random() * 3),
  log: [],
}
export const CharacterContext = createContext(initialState)

const CharacterContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      case TYPES.SET_NAME:
        return {
          ...initialState,
          name: action.name,
          isPlaying: true,
        }
      case TYPES.DAMAGE:
        return {
          ...state,
          hp: state.hp - action.damage,
          log: [
            ...state.log,
            [
              `${getArticle(action.monster, true)} ${
                action.monster
              } dealt you ${action.damage} damage`,
            ],
          ],
        }
      case TYPES.GET_XP:
        return action.monster === "Kogetaro, king of cats"
          ? {
              ...state,
              xp: state.xp + action.xp,
              log: [
                ...state.log,
                [`You vanquished Kogetaro, king of cats!!!!!`],
              ],
              isGameOver: true,
              won: true,
            }
          : {
              ...state,
              xp: state.xp + action.xp,
              log: [
                ...state.log,
                [
                  `You vanquished ${getArticle(action.monster)} ${
                    action.monster
                  }`,
                ],
              ],
            }
      case TYPES.LEVEL_UP:
        return {
          ...state,
          level: state.level++,
          maxHp: state.maxHp + state.level * Math.round(Math.random() * 6),
          hp: state.maxHp,
          strength: state.strength + 1 + Math.floor(Math.random() * 4),
        }
      case TYPES.PICK_UP_WEAPON:
        return {
          ...state,
          weapons: [action.item],
          log: [
            ...state.log,
            [
              action.droppedItem
                ? `You dropped ${getArticle(action.droppedItem.name)} ${
                    action.droppedItem.name
                  } and picked up ${getArticle(action.item.name)} ${
                    action.item.name
                  }`
                : `You picked up ${getArticle(action.item.name)} ${
                    action.item.name
                  }`,
            ],
          ],
        }
      case TYPES.PICK_UP_ITEM:
        return {
          ...state,
          items: [...state.items, action.item],
          log: [
            ...state.log,
            [
              `You picked up ${getArticle(action.item.name)} ${
                action.item.name
              }`,
            ],
          ],
        }
      case TYPES.USE_ITEM:
        let itemsCopy = [...state.items]
        let removedItems = itemsCopy.splice(action.index, 1)

        return {
          ...state,
          items: itemsCopy,
          hp:
            action.item.type === "potion"
              ? state.hp + action.item.strength >= state.maxHp
                ? state.maxHp
                : state.hp + action.item.strength
              : state.hp,
        }
      case TYPES.LOG_MESSAGE:
        return {
          ...state,
          log: [...state.log, [action.message]],
        }
      case TYPES.GAME_OVER:
        return {
          ...state,
          hp: 0,
          isGameOver: true,
        }
      case TYPES.NEW_GAME:
        return {
          ...initialState,
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
