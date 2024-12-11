import { add } from "lodash-es"

function formatInput(input) {
  return input.split('\n').map((row) => {
    const [component, list] = row.split(': ')
    return [component, list.split(' ')]
  })
}

function buildGraph(relations) {
  const graph = {}

  function addToGraph(key, ...items) {
    if (!graph[key]) {
      graph[key] = []
    }
    graph[key].push(...items)
  }

  for (const [component, list] of relations) {
    addToGraph(component, ...list)

    for (const element of list) {
      addToGraph(element, component)
    }
  }

  return graph
}

function breadthFirstSearch(graph, start, finish) {
  const queue = [start]
  const visited = new Set([start])
  const parents = new Map()

  while (queue.length) {
    const point = queue.shift()

    if (point === finish) {
      const path = [finish]
      let node = finish

      while (node !== start) {
        node = parents.get(node)
        path.push(node)
      }
      return path.reverse()
    }

    for (const neighbor of graph[point]) {
      if (!visited.has(neighbor)) {
        parents.set(neighbor, point)
        visited.add(neighbor)
        queue.push(neighbor)
      }
    }

  }
}

export function part1(input) {
  const relations = formatInput(input)
  const graph = buildGraph(relations)

  const nodes = Object.keys(graph)
  const nodeWeight = Object.fromEntries(
    nodes.map((node) => [node, 0])
  )
  nodes.forEach((node, i) => {
    const otherNodes = [...nodes.slice(0, i), ...nodes.slice(i + 1)]
    otherNodes.forEach((otherNode) => {
      const path = breadthFirstSearch(graph, node, otherNode)

      path.forEach((node) => {
        nodeWeight[node]++
      })
    })
  })
  return nodeWeight;
}

export function part2(input) {
  // return input
}