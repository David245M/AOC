import fs from 'node:fs'
import path from 'node:path'

export const getInput = (year, day, isTest) => {
  const input = fs.readFileSync(path.resolve(
    import.meta.dirname,
    `../years/${year}/day${day}`,
    isTest ? 'input-test.txt' : 'input.txt'
  )).toString()

  return input
}