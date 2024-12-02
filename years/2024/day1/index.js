function formatInput(input) {
  return input.split('\r\n').map((row) => row.split(/\s+/).map(Number))
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
  
  const sumOfDistances = distances.reduce((sum, a) => sum + a, 0)

  return sumOfDistances
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
  
  const sumOfSimilarities = similarities.reduce((sum, a) => sum + a, 0)

  return sumOfSimilarities
}