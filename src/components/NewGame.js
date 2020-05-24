import React, { useState, useContext } from "react"
import { CharacterContext } from "../contexts/characterContext"
import classNames from "classnames/bind"
import styles from "./NewGame.module.scss"

let cx = classNames.bind(styles)

function NewGame() {
  const [username, setUsername] = useState("")
  const { charDispatch } = useContext(CharacterContext)

  let btnClass = cx({
    button: true,
    inactive: !username,
  })
  const handleChange = (e) => {
    setUsername(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    username && charDispatch({ type: "SET_NAME", name: username })
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        Welcome to the Mines of Kogetaro, brave adventurer.
      </h3>
      <p className={styles.text}>What is your name?</p>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          className={styles.input}
          type="text"
          name="username"
          onChange={(e) => handleChange(e)}
          value={username}
          placeholder="Enter name here"
        />
        <button className={btnClass} type="submit">
          Start
        </button>
      </form>
    </div>
  )
}

export default NewGame
