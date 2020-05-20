export const pickRangeNumber = (min, max) => {
  const range = max - min
  const rangeNumber = min + Math.round(Math.random() * range)
  return rangeNumber
}
export const getRandomCellOnMap = (mapHeight, mapWidth) => {
  return Math.round(Math.random() * mapHeight * mapWidth)
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
