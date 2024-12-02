import yargs from 'yargs/yargs'
import { getInput } from './utils.js'

const argv = yargs(process.argv.slice(2))
  .usage('Usage: $0 --year [num] --day [num] [--part [num] --test]')
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
    part: {
      alias: 'p',
      describe: 'Part of the day (1-2)',
      defaultDescription: '1,2',
      type: 'number'
    },
    test: {
      alias: 't',
      describe: 'Run on test data or not',
      defaultDescription: 'false',
      type: 'boolean',
      default: false
    }
  })
  .parse()

const { year, day, part, test } = argv

import(`../years/${year}/day${day}/index.js`).then(({ part1, part2 }) => {
  const partParsed = part ? `part ${part}` : 'both parts'

  console.log(`Running year ${year}, day ${day}, ${partParsed}${test ? ' (test)' : ''}.`)

  const input = getInput(year, day, test)

  if (part !== 2) {
    console.log('Part 1:')
    console.log(part1(input))
  }

  if (part !== 1) {
    console.log('Part 2:')
    console.log(part2(input))
  }

})