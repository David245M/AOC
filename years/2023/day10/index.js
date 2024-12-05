function formatInput(input) {
  return input.split('\r\n').map((row) => row.split(''))
}

const Pipes = {
  vertical: '|',
  horizontal: '-',
  northEast: 'L',
  northWest: 'J',
  southWest: '7',
  southEast: 'F',
  start: 'S',
}

const Directions = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
}

const mapPipeToDirection = {
  top: {
    [Pipes.vertical]: Directions.top,
    [Pipes.southWest]: Directions.left,
    [Pipes.southEast]: Directions.right,
  },
  right: {
    [Pipes.horizontal]: Directions.right,
    [Pipes.northWest]: Directions.top,
    [Pipes.southWest]: Directions.bottom,
  },
  bottom: {
    [Pipes.vertical]: Directions.bottom,
    [Pipes.northWest]: Directions.left,
    [Pipes.northEast]: Directions.right,
  },
  left: {
    [Pipes.horizontal]: Directions.left,
    [Pipes.northEast]: Directions.top,
    [Pipes.southEast]: Directions.bottom,
  },
}


function getStartPointPos(rows) {
  for(const row of rows) {
    for(const char of row) {
      if (char === Pipes.start) {
        return [rows.indexOf(row), row.indexOf(char)]
      }
    }
  }
}

function getStartDirections([y, x], rows) {
  const directions = []
  if (
    y > 0 &&
    (
      rows[y - 1][x] === Pipes.vertical ||
      rows[y - 1][x] === Pipes.southEast ||
      rows[y - 1][x] === Pipes.southWest
    )
  ) {
    directions.push(Directions.top)
  }
  if (
    x < rows[0].length - 1 && 
    (
      rows[y][x + 1] === Pipes.horizontal ||
      rows[y][x + 1] === Pipes.southWest ||
      rows[y][x + 1] === Pipes.northWest
    )
  ) {
    directions.push(Directions.right)
  }
  if (
    x > 0 &&
    (
      rows[y][x - 1] === Pipes.horizontal ||
      rows[y][x - 1] === Pipes.southEast ||
      rows[y][x - 1] === Pipes.northEast
    )
  ) {
    directions.push(Directions.left)
  }
  if (
    y < rows.length - 1 &&
    rows[y + 1][x] === Pipes.vertical ||
    rows[y + 1][x] === Pipes.northEast ||
    rows[y + 1][x] === Pipes.northWest
  ) {
    directions.push(Directions.bottom)
  }
  return directions
}

export function part1(input) {
  const surface = formatInput(input)
  const startPos = getStartPointPos(surface)

  let pos = startPos
  let point = Pipes.start
  const path = [pos]
  let direction = getStartDirections(pos, surface)[0]
  do {
    const [y,x] = pos

    if (direction === Directions.top) {
      pos = [y - 1, x]
    }
    else if (direction === Directions.right) {
      pos = [y, x + 1]
    }
    else if (direction === Directions.bottom) {
      pos = [y + 1, x]
    }
    else if (direction === Directions.left) {
      pos = [y, x - 1]
    }

    path.push(pos)
    point = surface[pos[0]][pos[1]]
    direction = mapPipeToDirection[direction][point]
    
  } while (point !== Pipes.start)

  // outputPipes(surface, path)

  const length = (path.length - 1) / 2
  return length
}

function outputPipes(surface, path) {
  console.log(path)
  surface.forEach((row, y) => {
    row.forEach((char, x) => {
      if (path.some((coords) => coords[0] === y && coords[1] === x)) {
        process.stdout.write(`\x1b[38;2;0;255;0m${char}\x1b[0m`)
      }
      else {
      process.stdout.write(char)
      }
    })
    process.stdout.write('\n')
  })
}

export function part2(input) {
  const square = part1(input)
  const result = input.length^2 - square + 1
  return result
}