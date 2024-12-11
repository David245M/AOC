import { sum } from "lodash-es"

function formatInput(input) {
  return input.split('\n').map((row) => {
    const [left, right] = row.split(': ')
    return [+left, right.split(' ').map(Number)]
  })
}

function generateSignsSombination(signs, size) {
  if (size === 1) {
    return signs
  }
  return signs.map((sign) => {
    const combinations = generateSignsSombination(signs, size - 1)
    return combinations.map((combination) => {
      return [sign, combination].flat()
    })
  }).flat()
}

function createEquasion(numbers, signs) {
  const equasion = [numbers[0]]
  for (let i = 0; i < signs.length; i++) {
    equasion.push(signs[i], numbers[i + 1])
  }
  return equasion
}

export function part1(input) {
  const equasions = formatInput(input)
  const signs = [['*'], ['+']]

  const trueEquasions = equasions.filter((equasion) => {
    const [result, numbers] = equasion

    const signCombinations = generateSignsSombination(signs, numbers.length - 1)

    const equasionSolutions = signCombinations.map((comb) => {
      return comb.reduce((acc, sign, i) => {
        const equasion = acc + sign + numbers[i + 1]
        return eval(equasion)
      }, numbers[0])
    })
    return equasionSolutions.includes(result)
  })

  return sum(trueEquasions.map(([result]) => result))
}

export function part2(input) {
  const signs = [['*'], ['+'], ['||']]
  const equasions = formatInput(input)

  const trueEquasions = equasions.filter((equasion) => {
    const [result, numbers] = equasion

    const signCombinations = generateSignsSombination(signs, numbers.length - 1)

    const equasionSolutions = signCombinations.map((comb) => {
      return comb.reduce((acc, sign, i) => {
        const equasion = acc + sign + numbers[i + 1]
        return sign === '||' ? Number(''+ acc + numbers[i + 1]) : eval(equasion)
      }, numbers[0])
    })
    return equasionSolutions.includes(result)
  })

  return sum(trueEquasions.map(([result]) => result))
}