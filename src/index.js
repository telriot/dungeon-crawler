import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./components/App"
import CharacterContextProvider from "./contexts/characterContext"

ReactDOM.render(
  <React.StrictMode>
    <CharacterContextProvider>
      <App />
    </CharacterContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
