import fs from 'node:fs'
import path from 'node:path'
import yargs from 'yargs/yargs'

const argv = yargs(process.argv.slice(2))
  .usage('Usage: $0 --year [num] --day [num]')
  .options({
    year: {
      alias: 'y',
      describe: 'Year',
      type: 'number',
      demandOption: true
    },
    day: {
      alias: 'd',
      describe: 'Day of the year (1-25)',
      type: 'number',
      demandOption: true
    },
  })
  .parse()

const yearPath = path.resolve(import.meta.dirname, `../years/${argv.year}`)
const dayPath = path.resolve(yearPath, `day${argv.day}`)

if (!fs.existsSync(yearPath)) {
  fs.mkdirSync(yearPath)
}

if (fs.existsSync(dayPath)) {
  throw new Error(`Year ${argv.year} / Day ${argv.day} already exists`)
}

fs.mkdirSync(dayPath)
fs.writeFileSync(path.resolve(dayPath, 'input.txt'), '')
fs.writeFileSync(path.resolve(dayPath, 'input-test.txt'), '')

const scriptContent = `function formatInput(input) {
  return input.split('\\r\\n').map((row) => row.split(''))
}

export function part1(input) {
  return input
}

export function part2(input) {
  return input
}`
fs.writeFileSync(path.resolve(dayPath, 'index.js'), scriptContent)