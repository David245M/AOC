import { cloneDeep, inRange, isEqual, last } from "lodash-es"

function formatInput(input) {
  return input.split('\n').map((row) => row.split(''))
}

function getStartPoint(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if(matrix[i][j] === '^')
        return [i, j]
    }
  }
}

function pointInMap(point, map) {
  return inRange(point[0], 0, map.length) &&
    inRange(point[1], 0, map[0].length)
}

const Directions = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down',
}

const mapDirectionsToDiff = {
  [Directions.left]: [0, -1],
  [Directions.right]: [0, 1],
  [Directions.up]: [-1, 0],
  [Directions.down]: [1, 0],
}

const mapNextDirection = {
  [Directions.up]: Directions.right,
  [Directions.right]: Directions.down,
  [Directions.down]: Directions.left,
  [Directions.left]: Directions.up,
}

const oppositeDirection = {
  [Directions.up]: Directions.down,
  [Directions.down]: Directions.up,
  [Directions.left]: Directions.right,
  [Directions.right]: Directions.left,
}

function getPath(map, startPoint) {
  const path = []
  let [y, x] = startPoint
  let direction = Directions.up
  const turns = [[direction, startPoint]]

  do {
    const [diffY, defX] = mapDirectionsToDiff[direction]
    const [newY, newX] = [y + diffY, x + defX]

    if (!pointInMap([newY, newX], map)) {
      break
    }

    if (map[newY][newX] === '#') {
      direction = mapNextDirection[direction]

      if (turns.some(turn => isEqual(
        turn, [direction, [newY, newX]])
      )) {
        throw new Error('infinite loop')
      } else {
        turns.push([direction, [newY, newX]])
      }
    } else {
      y = newY
      x = newX
      path.push([y, x])
    }
  } while (pointInMap([y, x], map))

  return path
}

function outputPath(matrix, pathSet) {
  matrix.forEach((row, y) => {
    row.forEach((char, x) => {
      if (pathSet.has([y, x].join(','))) {
        process.stdout.write(`\x1b[38;2;0;255;0mX\x1b[0m`)
      } else {
        process.stdout.write(char)
      }
    })
    process.stdout.write('\n')
  });
}

export function part1(input) {
  const map = formatInput(input)

  const startPoint = getStartPoint(map)
  const path = getPath(map, startPoint)
  const pathUnique = new Set(
    path.map((coords) => coords.join(','))
  )

  return pathUnique.size
}

export function part2(input) {
  const map = formatInput(input)
  const startPoint = getStartPoint(map)

  const path = getPath(map, startPoint)
  const pathUnique = new Set(
    path.map((coords) => coords.join(','))
  )

  const obstacles = []

  for (const point of pathUnique) {
    const [y, x] = point.split(',').map(Number)

    const alteredMap = cloneDeep(map)
    alteredMap[y][x] = '#'

    let path
    try {
      path = getPath(alteredMap, startPoint)
    } catch (error) {
      obstacles.push([y, x])
    }
  }

  return obstacles.length
}