import React, { useReducer, createContext, useEffect } from "react"
import TYPES from "./types"

const initialState = {
  name: "",
  position: undefined,
  health: undefined,
  exp: 0,
  level: 1,
  items: [],
}
export const CharacterContext = createContext(initialState)

const CharacterContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <CharacterContext.Provider value={{ state, dispatch }}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterContextProvider
