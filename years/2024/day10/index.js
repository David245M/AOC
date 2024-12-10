import { isEqual, sum, uniqWith } from "lodash-es";

function formatInput(input) {
  return input.split('\n').map((row) => row.split(''))
}

function getStartPoints(map) {
  const points = []

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '0') {
        points.push([i, j])
      }
    }
  }

  return points
}

function getPointsAround(point, map) {
  const [y, x] = point;
  const points = []

  if (y > 0) points.push([y - 1, x])
  if (x < map[0].length - 1) points.push([y, x + 1])
  if (y < map.length - 1) points.push([y + 1, x])
  if (x > 0) points.push([y, x - 1])

  return points
}

function searchWide(map, startPoint) {
  const topPoints = []
  const queue = [startPoint]

  while (queue.length) {
    const point = queue.shift()
    const pointsAround = getPointsAround(point, map)

    for (const around of pointsAround) {
      if (map[around[0]][around[1]] - map[point[0]][point[1]] !== 1) {
        continue
      }
      if (map[around[0]][around[1]] === '9') {
        topPoints.push(around)
      }
      queue.push(around)
    }

  }
  return topPoints
}

export function part1(input) {
  const map = formatInput(input)
  const startPoints = getStartPoints(map)

  const trailheadsScore = startPoints.map((point) => {
    const topPoints = searchWide(map, point)
    return uniqWith(topPoints, isEqual).length
  })
  
  return sum(trailheadsScore)

}

export function part2(input) {
  const map = formatInput(input)
  const startPoints = getStartPoints(map)

  const trailheadsScore = startPoints.map((point) => {
    const topPoints = searchWide(map, point)
    return topPoints.length
  })
  
  return sum(trailheadsScore)
}