import {
  pickRangeNumber,
  getSurroundings,
  pickRandomDirection,
} from "./helpers"

const determineFirstStepDirection = (grid, start, gridWidth) => {
  const surroundings = getSurroundings(start, grid, gridWidth)
  const { N, S, W, E } = surroundings
  return N.type === "floor"
    ? "S"
    : S.type === "floor"
    ? "N"
    : W.type === "floor"
    ? "E"
    : E.type === "floor"
    ? "W"
    : null
}
const calculateNextStep = (grid, start, direction, gridWidth) => {
  const surroundings = getSurroundings(start, grid, gridWidth)
  const { N, S, W, E } = surroundings
  return direction === "N"
    ? N
    : direction === "S"
    ? S
    : direction === "W"
    ? W
    : direction === "E"
    ? E
    : null
}

const isThereSpaceToMove = (surroundings) => {
  for (let cell of Object.values(surroundings)) {
    if (cell.type === undefined || cell.type === "wall" || cell.type === "door")
      return true
  }
  return false
}

const digThrough = ({
  start,
  direction,
  length,
  grid,
  gridWidth,
  gridHeight,
}) => {
  let arrived = false
  let startingPoint = start

  for (let step = 0; step < length; step++) {
    const nextStep = calculateNextStep(
      grid,
      startingPoint,
      direction,
      gridWidth
    )

    const nextStepIndex = nextStep.row * gridWidth + nextStep.col

    if (!nextStep) {
      break
    }

    let nextCellType = nextStep.type

    if (nextCellType === undefined) {
      grid[nextStepIndex].type = "tunnel"
      startingPoint = nextStepIndex
      continue
    } else if (nextCellType === "wall") {
      grid[nextStepIndex].type = "door"
      arrived = true
      break
    } else if (nextCellType === "floor" || nextCellType === "tunnel") {
      const surroundings = getSurroundings(startingPoint, grid, gridWidth)
      if (!isThereSpaceToMove(surroundings)) {
        arrived = true
      } else {
        break
      }
    } else if (nextCellType === "border" || nextCellType === "corner") {
      break
    } else if (nextCellType === "door") {
      arrived = true
      break
    }
  }

  if (arrived === false) {
    digThrough({
      start: startingPoint,
      direction: pickRandomDirection(),
      length,
      grid,
      gridWidth,
      gridHeight,
    })
  }
  return true
}

export const createTunnel = ({
  start,
  grid,
  gridWidth,
  gridHeight,
  stepMinLength,
  stepMaxLength,
}) => {
  let length = pickRangeNumber(stepMinLength, stepMaxLength)
  let firstStepDirection = determineFirstStepDirection(grid, start, gridWidth)
  let firstStep = calculateNextStep(grid, start, firstStepDirection, gridWidth)
  if (firstStep.type === "border" || firstStep.type === "corner") {
    return false
  }
  digThrough({
    start,
    direction: firstStepDirection,
    length,
    grid,
    gridWidth,
    gridHeight,
  })
}
