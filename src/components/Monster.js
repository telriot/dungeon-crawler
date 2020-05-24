import React from "react"
import styles from "./Cell.module.scss"
import kobold from "../media/kobold.png"
import hobgoblin from "../media/hobgoblin.png"
import gnoll from "../media/gnoll.png"
import troll from "../media/troll.png"
import goblin from "../media/goblin.png"
import skeleton from "../media/skeleton.png"
import orc from "../media/orc.png"
import ogre from "../media/ogre.png"
import orcKnight from "../media/orc_knight.png"
import salamander from "../media/salamander.png"
import vampire from "../media/vampire.png"
import stoneGiant from "../media/stone_giant.png"
import cyclops from "../media/cyclops.png"
import fireGiant from "../media/fire_giant.png"
import balrog from "../media/balrog.png"
import dragon from "../media/dragon.png"
import guard from "../media/guard.png"
import kogetaro from "../media/kogetaro.png"

function Monster(props) {
  const monsterImg = (name) => {
    switch (name) {
      case "Kobold":
        return kobold
      case "Goblin":
        return goblin
      case "Skeleton":
        return skeleton
      case "Hobgoblin":
        return hobgoblin
      case "Orc":
        return orc
      case "Ogre":
        return ogre
      case "Gnoll":
        return gnoll
      case "Orc Knight":
        return orcKnight
      case "Salamander":
        return salamander
      case "Troll":
        return troll
      case "Vampire":
        return vampire
      case "Stone Giant":
        return stoneGiant
      case "Cyclops":
        return cyclops
      case "Fire Giant":
        return fireGiant
      case "Balrog":
        return balrog
      case "Dragon":
        return dragon
      case "Kogetaro's bandit guard":
        return guard
      case "Kogetaro, king of cats":
        return kogetaro
      default:
        return null
    }
  }
  const { monster } = props
  return (
    <img
      className={styles.monsterImg}
      src={monsterImg(monster.name)}
      alt={monster.name}
    ></img>
  )
}

export default Monster
