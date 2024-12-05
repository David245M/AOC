import { transpose } from "../../../utils.js"

function formatInput(input) {
  return input.split('\n').map((row) => row.split(''))
}

function getAllDiagonals(matrix) {
  const diagonals = []

  for (let i = 0; i < matrix.length; i++) {
    const diagonal = []
    for(let j = 0; j < i + 1; j++) {
      diagonal.push(matrix[j][matrix.length - 1 - i + j])
    }
    diagonals.push(diagonal)
  }

  for (let i = 1; i < matrix.length; i++) {
    const diagonal = []
    for(let j = 0; j < matrix.length - i; j++) {
      diagonal.push(matrix[i + j][j])
    }
    diagonals.push(diagonal)
  }

  for (let i = 0; i < matrix.length; i++) {
    const diagonal = []
    for(let j = 0; j < i + 1; j++) {
      diagonal.push(matrix[j][i - j])
    }
    diagonals.push(diagonal)
  }

  for (let i = 1; i < matrix.length; i++) {
    const diagonal = []
    for(let j = 0; j < matrix.length - i; j++) {
      diagonal.push(matrix[i + j][matrix.length -j - 1])
    }
    diagonals.push(diagonal)
  }

  return diagonals
}

function getMatches(input, regex) {
  const matches = []
  let found
  while ((found = regex.exec(input)) !== null) {
    matches.push(found)
    regex.lastIndex = found.index +1
  }
  return matches
}

export function part1(input) {
  const grid = formatInput(input)

  let count = 0

  const lines = [
    ...grid,
    ...transpose(grid),
    ...getAllDiagonals(grid),
  ].map(line => line.join(''))

  lines.forEach(line => {
    const matches = getMatches(line, /XMAS|SAMX/g)
    count += matches.length
  })

  return count
}

function getLongestDiagonals(matrix) {
  const main = []
  const side = []
  for(let i = 0; i < matrix.length; i++) {
    main.push(matrix[i][i])
    side.push(matrix[i][matrix.length - i - 1])
  }
  return [main, side]
}

export function part2(input) {
  const grid = formatInput(input)

  let count = 0
  for(let i = 0; i < grid.length - 2; i++) {
    for(let j = 0; j < grid[i].length - 2; j++) {
      const submatrix = [
        grid[i].slice(j, j + 3),
        grid[i + 1].slice(j, j + 3),
        grid[i + 2].slice(j, j + 3)
      ]
      const diagonals = getLongestDiagonals(submatrix)
      
      if(diagonals.every(
        diag => ['SAM', 'MAS'].includes(diag.join(''))
      )) {
        count++
      }
    }
  }
  return count
}