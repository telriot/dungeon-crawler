import potionWhite from "./media/potion_white.png"
import potionBlue from "./media/potion_blue.png"
import potionGold from "./media/potion_gold.png"
import potionCyan from "./media/potion_cyan.png"
import axe from "./media/axe.png"
import claymore from "./media/claymore.png"
import club from "./media/club.png"
import sword from "./media/sword.png"
import knife from "./media/knife.png"
import bread from "./media/bread.png"
import sausage from "./media/sausage.png"
import potionThick from "./media/potion_thick.png"
import magicSword from "./media/magic_sword.png"
import potionRed from "./media/potion_red.png"
import warHammer from "./media/warhammer.png"
import greatsword from "./media/greatsword.png"
import executioner from "./media/executioner_axe.png"
import magicAxe from "./media/magic_axe.png"
import superSword from "./media/super_magic_sword.png"

export const getArticle = (str, capitalize) => {
  const char = str.charAt()
  const vowels = ["a", "e", "i", "o", "u"]
  if (capitalize) {
    return vowels.includes(char) ? "An" : "A"
  } else {
    return vowels.includes(char) ? "an" : "a"
  }
}
export const pickRangeNumber = (min, max) => {
  const range = max - min
  const rangeNumber = min + Math.round(Math.random() * range)
  return rangeNumber
}
export const getRandomCellOnMap = (mapHeight, mapWidth) => {
  return Math.round(Math.random() * mapHeight * mapWidth)
}
export const getRandomCellType = (type, grid, toAvoid) => {
  const size = grid.length
  const possibleCells = []
  for (let cell = 0; cell < size; cell++) {
    if (!toAvoid) {
      grid[cell].type === type && possibleCells.push(cell)
    } else {
      grid[cell].type === type &&
        !grid[cell][toAvoid] &&
        possibleCells.push(cell)
    }
  }
  const randomCellIndex =
    possibleCells[Math.floor(Math.random() * possibleCells.length)]
  return randomCellIndex
}

export const getSurroundings = (start, grid, gridWidth) => {
  const N = grid[start - gridWidth]
  const S = grid[start + gridWidth]
  const W = grid[start - 1]
  const E = grid[start + 1]
  const surroundings = { N, S, W, E }
  return surroundings
}

export const getDirectionFromKey = (e) => {
  const key = e.keyCode
  return key === 38
    ? "N"
    : key === 40
    ? "S"
    : key === 39
    ? "E"
    : key === 37
    ? "W"
    : null
}
export const pickRandomDirection = () => {
  const random = Math.ceil(Math.random() * 4)
  return random === 1
    ? "N"
    : random === 2
    ? "S"
    : random === 3
    ? "W"
    : random === 4
    ? "E"
    : null
}

export const revealCells = (grid, start, width) => {
  let updatedGrid = grid.slice()
  const C = updatedGrid[start]
  const N = updatedGrid[start - width]
  const S = updatedGrid[start + width]
  const W = updatedGrid[start - 1]
  const E = updatedGrid[start + 1]
  const NE = updatedGrid[start - width + 1]
  const SW = updatedGrid[start + width - 1]
  const NW = updatedGrid[start - width - 1]
  const SE = updatedGrid[start + width + 1]
  const NN = updatedGrid[start - 2 * width]
  const NNW = updatedGrid[start - 2 * width - 1]
  const NNE = updatedGrid[start - 2 * width + 1]
  const SS = updatedGrid[start + 2 * width]
  const SSW = updatedGrid[start + 2 * width - 1]
  const SSE = updatedGrid[start + 2 * width + 1]
  const WW = updatedGrid[start - 2]
  const WNW = updatedGrid[start - width - 2]
  const WSW = updatedGrid[start + width - 2]
  const EE = updatedGrid[start + 2]
  const ENE = updatedGrid[start - width + 2]
  const ESE = updatedGrid[start + width + 2]

  const isBlocked = (pathCells) => {
    let blocked = 0
    for (let cell of pathCells) {
      if (cell.type === "floor" || cell.type === "tunnel") blocked++
    }
    return blocked === pathCells.length ? true : false
  }
  const surroundings = [C, N, S, W, E, NE, SW, NW, SE]
  for (let cell of surroundings) {
    cell.isVisible = true
  }
  if (isBlocked([N]) && NN) {
    NN.isVisible = true
    if (isBlocked([NW]) && NNW) {
      NNW.isVisible = true
    }
    if (isBlocked([NE]) && NNE) {
      NNE.isVisible = true
    }
  }
  if (isBlocked([S]) && SS) {
    SS.isVisible = true
    if (isBlocked([SW]) && SSW) {
      SSW.isVisible = true
    }
    if (isBlocked([SE]) && SSE) {
      SSE.isVisible = true
    }
  }
  if (isBlocked([W]) && WW) {
    WW.isVisible = true
    if (isBlocked([NW]) && WNW) {
      WNW.isVisible = true
    }
    if (isBlocked([SW]) && WSW) {
      WSW.isVisible = true
    }
  }
  if (isBlocked([E]) && EE) {
    EE.isVisible = true
    if (isBlocked([NE]) && ENE) {
      ENE.isVisible = true
    }
    if (isBlocked([SE]) && ESE) {
      ESE.isVisible = true
    }
  }
  return updatedGrid
}

export const itemImg = (name) => {
  switch (name) {
    case "Club":
      return club
    case "Bottle of Calpis":
      return potionWhite
    case "Bottle of Wine":
      return potionRed
    case "Ration of Bread":
      return bread
    case "Knife":
      return knife
    case "Healing Potion":
      return potionBlue
    case "Sausage":
      return sausage
    case "Thick Potion":
      return potionThick
    case "Potion of Absolute Restoration":
      return potionCyan
    case "Sword":
      return sword
    case "Axe":
      return axe
    case "Super Healing Potion":
      return potionGold
    case "Claymore":
      return claymore
    case "War Hammer":
      return warHammer
    case "Great Sword":
      return greatsword
    case "Executioner's Axe":
      return executioner
    case "Magic Axe":
      return magicAxe
    case "Magic Sword":
      return magicSword
    case "Super Magic Sword":
      return superSword
    default:
      return null
  }
}
export const fight = ({
  monster,
  cellIndex,
  dispatch,
  charState,
  charDispatch,
}) => {
  const monsterHit = monster.strength + Math.round(Math.random() * 6)
  const weaponDamage = charState.weapons.length
    ? charState.weapons[0].strength
    : 0
  const charHit =
    weaponDamage + charState.strength + Math.round(Math.random() * 6)
  if (monsterHit < charState.hp) {
    charDispatch({
      type: "DAMAGE",
      damage: monsterHit,
      monster: monster.name,
    })
    if (charHit < monster.hp) {
      dispatch({
        type: "DAMAGE",
        damage: charHit,
        cell: cellIndex,
        monster: monster.name,
      })
      charDispatch({
        type: "LOG_MESSAGE",
        message: `You hit the ${monster.name}`,
      })
    } else {
      dispatch({ type: "KILL", cell: cellIndex })
      charDispatch({ type: "GET_XP", xp: monster.xp, monster: monster.name })
    }
  } else {
    console.log("GAME OVER")
    charDispatch({ type: "GAME_OVER" })
  }
}

export const pickUp = ({ state, charState, dispatch, charDispatch }) => {
  const currentCell = state.map[state.characterPosition]
  if (currentCell.item) {
    const item = currentCell.item
    if (item.type === "weapon") {
      const charWeapon = charState.weapons.length ? charState.weapons[0] : null
      dispatch({
        type: "DROP_ITEM",
        cell: state.characterPosition,
        item: charWeapon,
      })
      charDispatch({
        type: "PICK_UP_WEAPON",
        droppedItem: charWeapon,
        item,
      })
    } else {
      if (charState.items.length < 4) {
        charDispatch({ type: "PICK_UP_ITEM", item })
        dispatch({ type: "REMOVE_ITEM", cell: state.characterPosition })
      } else {
        dispatch({
          type: "LOG_MESSAGE",
          message: "You have too many items on you already!",
        })
      }
    }
  } else {
    dispatch({
      type: "LOG_MESSAGE",
      message: "There is nothing to pick up here",
    })
  }
}

export const consumeItem = (item, index, charDispatch) => {
  charDispatch({ type: "USE_ITEM", item, index })
}
