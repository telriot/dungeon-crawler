import React, { useReducer, createContext, useEffect } from "react"
import TYPES from "./types"

const initialState = {
  map: "",
}
export const MapContext = createContext(initialState)

const MapContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  )
}

export default MapContextProvider
