import { sum } from "lodash-es"

function formatInput(input) {
  return input.split('\n').map((row) => row.split(/\s+/).map(Number))
}

export function part1(input) {
  const rows = formatInput(input)
  const columns = [
    rows.map(row => row[0]).sort(),
    rows.map(row => row[1]).sort(),
  ]
  
  const distances = Array.from({ length: columns[0].length }, (_v, i) => (
    Math.abs(columns[0][i] - columns[1][i])
  ))

  return sum(distances)
}
export function part2(input) {
  const rows = formatInput(input)
  const columns = [
    rows.map(row => row[0]).sort(),
    rows.map(row => row[1]).sort(),
  ]

  const similarities = columns[0].map((num) => {
    const count = columns[1].filter((n) => n === num).length
    return num * count
  })
  
  return sum(similarities)
}