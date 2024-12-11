import { groupBy, sum } from "lodash-es"

function formatInput(input) {
  const [rules, updates] = input.split('\n\n')
  return [
    rules.split('\n').map(rule => rule.split('|').map(Number)),
    updates.split('\n').map(update => update.split(',').map(Number))
  ]
}

function getUpdateSet(update) {
  return new Map(update.map((num, i) => [num, i]))
}

function isUpdateValid(update, rules) {
  const updateSet = getUpdateSet(update)

  return rules.every((rule) => {
    const firstIndex = updateSet.get(rule[0])
    const secondIndex = updateSet.get(rule[1])

    if (firstIndex === undefined || secondIndex === undefined) {
      return true
    }
    return firstIndex < secondIndex
  })
}

function getMiddleElement(list) {
  return list[(list.length - 1) / 2]
}

export function part1(input) {
  const [rules, updates] = formatInput(input)

  const validUpdates = updates.filter((update) => {
    return isUpdateValid(update, rules)
  })

  const middleElements = validUpdates.map(getMiddleElement)

  return sum(middleElements)
}

export function part2(input) {
  const [rules, updates] = formatInput(input)

  const {
    false: invalid
  } = groupBy(updates, (update) => isUpdateValid(update, rules))

  const rulesMap = new Map(
    [...new Set(rules.map(rule => rule[0]))].map((firstEl) => {
      return [
        firstEl,
        rules.filter((rule) => rule[0] === firstEl).map((rule) => rule[1])
      ]
    })
  )

  const fixed = [...invalid].map((update) => {
    return update.sort((a, b) => {
      const rightOrderEntry = rulesMap.get(a)
      const wrongOrderEntry = rulesMap.get(b)

      if (rightOrderEntry && rightOrderEntry.includes(b)) {
        return -1
      }
      if (wrongOrderEntry && wrongOrderEntry.includes(a)) {
        return 1
      }
      return 0
    })
  })

  const middleElements = fixed.map(getMiddleElement)

  return sum(middleElements)
}