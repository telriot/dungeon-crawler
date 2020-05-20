import { createTunnel } from "./tunnels"
import { pickRangeNumber, getRandomCellOnMap, getSurroundings } from "./helpers"
const GRID_HEIGHT = 50
const GRID_WIDTH = 50
const MIN_ROOMS = 5
const MAX_ROOMS = 8
const MIN_ROOM_DIMENSION = 5
const MAX_ROOM_DIMENSION = 10
const DOOR_FACTOR = 2
//MAP CREATION
const createGrid = (height, width) => {
  let grid = []
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      grid.push({ type: undefined, row, col })
    }
  }
  return grid
}

const createRoom = (minDimension, maxDimension) => {
  const height = pickRangeNumber(minDimension, maxDimension)
  const width = pickRangeNumber(minDimension, maxDimension)
  const maxDoors = Math.floor((height + width) / 6.75)
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
            (Math.random() * (width + height * 2) <= DOOR_FACTOR ||
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
        console.log("no valid space")
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
const placeBorders = (grid, height, width) => {
  for (let cell = 0; cell < grid.length; cell++) {
    if (cell < width) grid[cell].type = "border"
    const modulo = cell % width
    if (modulo === 0 || modulo === width - 1) grid[cell].type = "border"
    if (cell > grid.length - width) grid[cell].type = "border"
  }
}

const locateDoors = (grid) => {
  const doors = []
  for (let cell = 0; cell < grid.length; cell++) {
    grid[cell].type === "door" && doors.push(cell)
  }
  return doors
}

export const createDungeon = ({
  gridHeight,
  gridWidth,
  minRooms,
  maxRooms,
  minRoomDimension,
  maxRoomDimension,
}) => {
  let grid = createGrid(gridHeight, gridWidth)
  placeBorders(grid, gridHeight, gridWidth)

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
      stepMinLength: 2,
      stepMaxLength: 15,
    })
  }
  return grid
}
