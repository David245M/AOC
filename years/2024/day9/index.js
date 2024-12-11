import { cloneDeep, filter, isEqual, last, range, sum } from "lodash-es"

function formatInput(input) {
  return input.split('')
}

function getLayout(disk) {
  let index = 0
  const layout = []
  disk.forEach((length, i) => {
    const isSpace = i % 2
    layout.push(...Array(Number(length)).fill(isSpace ? '.' : index))
    if (isSpace) index++
  })
  return layout
}

export function part1(input) {
  const disk = formatInput(input)
  const layout = getLayout(disk)
  
  while (layout.indexOf('.') !== -1) {
    if (last(layout) === '.') {
      layout.pop()
      continue
    }
    const indexOfFirstSpace = layout.indexOf('.')
    layout[indexOfFirstSpace] = layout.pop()
  }

  const checksums = layout.map((char, i) => char * i)
  return sum(checksums)
}

function getLayoutChunks(disk) {
  return disk.reduce((layout, char, i) => {
    const length = Number(char)
    if (length === 0) return layout
    return [...layout, {
      length,
      type: i % 2 ? 'space' : 'file',
      index: i % 2 ? undefined : Math.ceil((i - 1) / 2),
    }]
  }, [])
}

function outputLayoutChunks(layout) {
  layout.forEach(({ type, length, index }) => {
    if (type === 'space') {
      process.stdout.write('.'.repeat(length))
    } else {
      process.stdout.write(String(index).repeat(length))
      index++
    }
  })
  process.stdout.write('\n')
}

export function part2(input) {
  const disk = formatInput(input)
  const layout = getLayoutChunks(disk)

  while (true) {
    // outputLayoutChunks(layout)
    const layoutCopy = cloneDeep(layout)
    const filesReversedIndexes = filter(
      range(0, layout.length),
      (i) => layout[i].type === 'file'
    ).reverse()

    for (const fileIndex of filesReversedIndexes) {
      const lastFile = layout[fileIndex]
      const spaceIndexes = filter(
        range(0, fileIndex),
        (i) => layout[i].type === 'space' && layout[i].length >= lastFile.length
      )

      if (spaceIndexes.length) {
        const spaceIndex = spaceIndexes.at(0)
        const spaceItem = layout[spaceIndex]

        if (lastFile.length === spaceItem.length) {
          layout[spaceIndex] = lastFile
          layout[fileIndex] = { length: lastFile.length, type: 'space' }
        } else {
          layout[fileIndex] = {
            length: lastFile.length,
            type: 'space',
          }
          layout.splice(spaceIndex, 1, lastFile, {
            length: spaceItem.length - lastFile.length,
            type: 'space',
          })
        }
        break
      }
    }
    if (isEqual(layout, layoutCopy)) {
      break
    }
  }

  const checksums = layout
    .reduce((str, { type, length, index }) => {
      str.push(Array(length).fill(type === 'space' ? 0 : index))
      return str
    }, [])
    .flat()
    .map((num, i) => num * i)

  return sum(checksums)
}