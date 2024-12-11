import { sum } from "lodash-es"

function findMultiplications(input) {
  const allMatches = input.matchAll(/mul\(\d{1,3},\d{1,3}\)/g)
  return [...allMatches]
}

export function part1(input) {
  const mulOperations = findMultiplications(input)

  const multiplications = mulOperations.map(([match]) => {
    const [first, second] = match.match(/\d{1,3}/g).map(Number)
    return first * second
  })

  return sum(multiplications)
}

export function part2(input) {
  const rows = input.split('don\'t()')

  const matches = rows.slice(1).map(m => {
    const [, ...rest] = m.split('do()')
    return rest.join('')
  })
  matches.unshift(rows[0])

  const mulOperations = matches.map(findMultiplications).flat()
  // mulOperations.forEach((m, i) => console.log(i,m[0], m.index))

  const multiplications = mulOperations.map(([match]) => {
    const [first, second] = match.match(/\d{1,3}/g).map(Number)
    return first * second
  })

  return sum(multiplications)
}