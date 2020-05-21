export const nestedCopy = (array) => {
  return JSON.parse(JSON.stringify(array))
}

export const pickRangeNumber = (min, max) => {
  const range = max - min
  const rangeNumber = min + Math.round(Math.random() * range)
  return rangeNumber
}
export const getRandomCellOnMap = (mapHeight, mapWidth) => {
  return Math.round(Math.random() * mapHeight * mapWidth)
}
export const getRandomCellType = (type, grid) => {
  const size = grid.length
  const possibleCells = []
  for (let cell = 0; cell < size; cell++) {
    grid[cell].type === type && possibleCells.push(cell)
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
  /*const NE = grid[start - gridWidth + 1]
  const SW = grid[start + gridWidth - 1]
  const NW = grid[start - gridWidth - 1]
  const SE = grid[start + gridWidth + 1]*/
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
  const updatedGrid = nestedCopy(grid)
  const N = updatedGrid[start - width]
  const S = updatedGrid[start + width]
  const W = updatedGrid[start - 1]
  const E = updatedGrid[start + 1]
  const NE = updatedGrid[start - width + 1]
  const SW = updatedGrid[start + width - 1]
  const NW = updatedGrid[start - width - 1]
  const SE = updatedGrid[start + width + 1]

  const isBlocked = (pathCells) => {
    let blocked = 0
    for (let cell of pathCells) {
      if (cell.type === "floor" || cell.type === "tunnel") blocked++
    }
    return blocked === pathCells.length ? true : false
  }

  const NN = isBlocked([N]) ? updatedGrid[start - 2 * width] : null
  const SS = isBlocked([S]) ? updatedGrid[start + 2 * width] : null
  const WW = isBlocked([W]) ? updatedGrid[start - 2] : null
  const EE = isBlocked([E]) ? updatedGrid[start + 2] : null
  const NNW = isBlocked([N, NW]) ? updatedGrid[start - 2 * width - 1] : null
  const SSW = isBlocked([S, SW]) ? updatedGrid[start + 2 * width - 1] : null
  const NNE = isBlocked([N, NE]) ? updatedGrid[start - 2 * width + 1] : null
  const SSE = isBlocked([S, SE]) ? updatedGrid[start + 2 * width + 1] : null
  const WNW = isBlocked([W, NW]) ? updatedGrid[start - width - 2] : null
  const WSW = isBlocked([W, SW]) ? updatedGrid[start + width - 2] : null
  const ENE = isBlocked([E, NE]) ? updatedGrid[start - width + 2] : null
  const ESE = isBlocked([E, SE]) ? updatedGrid[start + width + 2] : null

  const surroundings = [
    N,
    S,
    W,
    E,
    NE,
    SW,
    NW,
    SE,
    NN,
    SS,
    WW,
    EE,
    NNW,
    SSW,
    NNE,
    SSE,
    WNW,
    WSW,
    ENE,
    ESE,
  ]
  for (let cell of surroundings) {
    if (cell) cell.isVisible = true
  }
  return updatedGrid
}
