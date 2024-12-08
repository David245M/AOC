import { isInMatrix } from "../../../utils.js";

function formatInput(input) {
  return input.split('\n').map((row) => row.split(''))
}

function getAntenasPositions(map) {
  const positions = new Map()

  map.forEach((row, i) => {
    row.forEach((frequency, j) => {
      if (frequency === '.') return

      positions.set(frequency, 
        positions.has(frequency)
          ? [...positions.get(frequency), [i, j]]
          : [[i, j]]
      )
    })
  })

  return positions
}

export function part1(input) {
  const map = formatInput(input)

  const antenasPositions = getAntenasPositions(map)

  const antinodesUnique = new Set()

  antenasPositions.forEach((positions) => {
    const antinodes = positions.map(([y, x], i) => {
      const otherNodes = [
        ...positions.slice(0, i),
        ...positions.slice(i + 1)
      ]

      return otherNodes.map(([otherY, otherX]) => {
        return [2 * y - otherY, 2 * x - otherX]
      })
    })

    const validAntinodes = antinodes.flat()
      .filter(node => isInMatrix(map, node))

    validAntinodes.forEach(antinodeToAdd => {
      if (!antinodesUnique.has(antinodeToAdd.join(','))) {
        antinodesUnique.add(antinodeToAdd.join(','))
      }
    })
  })

  return antinodesUnique.size
}

export function part2(input) {
  const map = formatInput(input)

  const antenasPositions = getAntenasPositions(map)

  const antinodesUnique = new Set()

  antenasPositions.forEach((positions) => {
    const antinodes = positions.map(([y, x], i) => {
      const otherNodes = [
        ...positions.slice(0, i),
        ...positions.slice(i + 1)
      ]

      const newNodes = otherNodes.map(([otherY, otherX]) => {
        const nodes = []
        const [dy, dx] = [otherY - y, otherX - x]

        for (
          let i = y + dy, j = x + dx;
          isInMatrix(map, [i, j]); 
          i += dy, j += dx
        ) {
          nodes.push([i, j])
        }

        return nodes
      })
      return newNodes.flat()
    }).flat()

    antinodes.forEach(antinodeToAdd => {
      if (!antinodesUnique.has(antinodeToAdd.join(','))) {
        antinodesUnique.add(antinodeToAdd.join(','))
      }
    })
  })

  // output(map, antinodesUnique)

  return antinodesUnique.size
}

function output(map, antinodes) {
  map.forEach((row, i) => {
    row.forEach((frequency, j) => {
      if (antinodes.has([i, j].join(','))) {
        process.stdout.write(`\x1b[38;2;0;255;0m${'#'}\x1b[0m`)
      } else {
        process.stdout.write(frequency)
      }
    })
    process.stdout.write('\n')
  })
}