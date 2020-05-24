import { createTunnel } from "./tunnels"
import {
  pickRangeNumber,
  getRandomCellOnMap,
  getRandomCellType,
} from "./helpers"
import { monsters, bossLevel } from "./monsters"
import { items } from "./items"
//MAP CREATION
const createGrid = (height, width, type) => {
  let grid = []
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      grid.push({
        type: type || undefined,
        row,
        col,
        isVisited: false,
        monster: null,
        item: null,
      })
    }
  }
  return grid
}
const placeBorders = (grid, width) => {
  for (let cell = 0; cell < grid.length; cell++) {
    if (cell < width) grid[cell].type = "border"
    const modulo = cell % width
    if (modulo === 0 || modulo === width - 1) grid[cell].type = "border"
    if (cell > grid.length - width) grid[cell].type = "border"
  }
}

const createRoom = (minDimension, maxDimension) => {
  const height = pickRangeNumber(minDimension, maxDimension)
  const width = pickRangeNumber(minDimension, maxDimension)
  const maxDoors = Math.floor((height + width) / 6.75)
  const doorFactor = 2
  let doors = 0
  let roomCells = []

  for (let row = 0; row <= height; row++) {
    for (let col = 0; col < width; col++) {
      const firstCell = row + col === 0
      const firstRow = row === 0
      const lastRow = row === height - 1
      const firstCol = col === 0
      const lastCol = col === width - 1
      //IF IT IS A WALL TILE
      if (firstRow || lastRow || firstCol || lastCol) {
        if (
          firstCell ||
          (firstRow && lastCol) ||
          (lastRow && firstCol) ||
          (lastRow && lastCol)
        ) {
          roomCells.push({ type: "corner", row, col })
        } else {
          if (
            doors < maxDoors &&
            (Math.random() * (width + height * 2) <= doorFactor ||
              (lastRow && lastCol - 1))
          ) {
            roomCells.push({ type: "door", row, col })
            doors++
          } else {
            roomCells.push({ type: "wall", row, col })
          }
        }
        //IF IT IS A ROOM TILE
      } else {
        roomCells.push({ type: "floor", row, col })
      }
    }
  }
  let room = { cells: roomCells, height, width }
  return room
}

const createRoomsArray = (number, minDimension, maxDimension) => {
  const rooms = []
  for (let i = 0; i < number; i++) {
    const room = createRoom(minDimension, maxDimension)
    rooms.push(room)
  }
  return rooms
}

const placeRoom = (grid, start, room, gridWidth) => {
  const { height, width } = room
  let index = 0
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      let gridPosition = start + col + row * gridWidth
      grid[gridPosition].type = room.cells[index].type
      index++
    }
  }
}

const isValidRoomPlacement = ({
  grid,
  start,
  roomHeight,
  roomWidth,
  gridWidth,
  gridHeight,
  minRoomDimension,
}) => {
  const gridArea = gridWidth * gridHeight
  const maxSouth = gridArea - (roomHeight + 1) * gridWidth
  const minNorth = gridWidth * 2
  const isOverMaxEast = gridWidth - (start % gridHeight) - 1 < roomWidth
  const isLessThenMinWest = start % gridWidth < 2

  if (
    start > maxSouth ||
    isOverMaxEast ||
    start < minNorth ||
    isLessThenMinWest
  )
    return false
  for (let row = 0; row < roomHeight; row++) {
    let rowStartingPoint = start + row * gridWidth
    let rowEndingPoint = rowStartingPoint + roomWidth
    if (grid[rowStartingPoint].type !== undefined) return false
    for (
      let cell = rowEndingPoint;
      cell > rowStartingPoint;
      cell -= minRoomDimension
    ) {
      if (grid[cell].type !== undefined) return false
    }
  }
  return true
}

const placeRooms = ({
  grid,
  gridHeight,
  gridWidth,
  minRooms,
  maxRooms,
  minRoomDimension,
  maxRoomDimension,
}) => {
  const roomsNumber = pickRangeNumber(minRooms, maxRooms)
  const rooms = createRoomsArray(
    roomsNumber,
    minRoomDimension,
    maxRoomDimension
  )
  for (let room of rooms) {
    let start
    let startIsValid = false
    let fuser = 0
    while (!startIsValid) {
      if (fuser >= gridHeight * gridWidth * 2) {
        return null
      }
      start = getRandomCellOnMap(gridHeight, gridWidth)
      startIsValid = isValidRoomPlacement({
        grid,
        start,
        roomHeight: room.height,
        roomWidth: room.width,
        gridWidth,
        gridHeight,
        minRoomDimension,
      })
      fuser++
    }
    placeRoom(grid, start, room, gridWidth)
  }
}

const locateDoors = (grid) => {
  const doors = []
  for (let cell = 0; cell < grid.length; cell++) {
    grid[cell].type === "door" && doors.push(cell)
  }
  return doors
}

const placeMonsters = (grid) => {
  const monsterDensity = 8
  for (let cell = 0; cell < grid.length; cell++) {
    if (grid[cell].type === "floor") {
      let rollOneHundred = Math.random() * 100
      if (monsterDensity > rollOneHundred) {
        let chance = Math.round(Math.pow(Math.random(), 2) * monsters.length)
        let monster = monsters[chance]
        grid[cell].monster = monster
      }
    } else if (grid[cell].type === "tunnel") {
      let rollOneHundred = Math.random() * 100
      if (monsterDensity - 3 > rollOneHundred) {
        let chance =
          Math.round(Math.pow(Math.random(), 2) * monsters.length) - 1
        let monster = chance < 0 ? monsters[0] : monsters[chance]
        grid[cell].monster = monster
      }
    }
  }
}
const placeItems = (grid) => {
  const itemDensity = 8
  for (let cell = 0; cell < grid.length; cell++) {
    if (grid[cell].type === "floor" || grid[cell].type === "tunnel") {
      let rollOneHundred = Math.random() * 100
      if (itemDensity > rollOneHundred) {
        let chance = Math.round(Math.pow(Math.random(), 2) * items.length)
        grid[cell].item = items[chance]
      }
    }
  }
}
const placeStaircase = (grid) => {
  const randomCell = getRandomCellType("floor", grid, "item")
  console.log(randomCell)
  grid[randomCell].type = "staircase"
}

export const createDungeon = ({
  gridHeight,
  gridWidth,
  minRooms,
  maxRooms,
  minRoomDimension,
  maxRoomDimension,
  stepMinLength,
  stepMaxLength,
}) => {
  let grid = createGrid(gridHeight, gridWidth)
  placeBorders(grid, gridWidth)

  placeRooms({
    grid,
    gridHeight,
    gridWidth,
    minRooms,
    maxRooms,
    minRoomDimension,
    maxRoomDimension,
  })
  const doors = locateDoors(grid)
  for (let door of doors) {
    createTunnel({
      start: door,
      grid,
      gridWidth,
      gridHeight,
      stepMinLength,
      stepMaxLength,
    })
  }
  placeMonsters(grid)
  placeItems(grid)
  placeStaircase(grid)
  return grid
}
export const createBossMap = () => {
  let map = createGrid(15, 15, "floor")
  placeBorders(map, 15)
  map[112].monster = bossLevel.kogetaro
  const guards = [97, 102, 124, 129]
  for (let guard of guards) {
    map[guard].monster = bossLevel.guard
  }
  return map
}
