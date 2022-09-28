// MARK: - Endeavour Case

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const createUniqueMatrix = (m: number, n: number) => {}

// MARK: - Bomberman Game
// Let's try to use some Classes

export const bomberMan = (n: number, grid: string[]) => {
  class Cell {
    state: '.' | 'O' | 'X' = '.'
    neighbors: Cell[] = []
    shouldClear = false

    constructor(state: '.' | 'O' | 'X') {
      this.state = state
    }

    value = () => {
      if (this.state === '.') return '.'
      else return 'O'
    }

    plant = () => {
      if (this.state === '.') this.state = 'O'
      else this.state = 'X'
    }

    explode = () => {
      this.shouldClear =
        this.state == 'X' || !!this.neighbors.filter(neighbor => neighbor.state === 'X').length
    }

    clear = () => {
      if (this.shouldClear) this.state = '.'
    }
  }

  if (n === 1 || n === 0) return grid

  const rowCount = grid.length
  const columnCount = grid[0]?.length ?? 0
  const newGrid = grid.map(row => row.split(''))
  let cellGrid: Cell[][] = []

  for (let i = 0; i < rowCount; i++) {
    cellGrid[i] = []
    for (let j = 0; j < columnCount; j++) {
      cellGrid[i].push(new Cell(newGrid[i][j] as '.' | 'O' | 'X'))
    }
  }

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      const neighborIndexes = [
        [i + 1, j],
        [i - 1, j],
        [i, j + 1],
        [i, j - 1],
      ].filter(
        element =>
          element[0] >= 0 && element[0] < rowCount && element[1] >= 0 && element[1] < columnCount,
      )
      cellGrid[i][j].neighbors = neighborIndexes.map(element => cellGrid[element[0]][element[1]])
    }
  }

  const cells = cellGrid.reduce((acc, val) => acc.concat(val), [])
  const run = (i: number) => {
    if (i % 2 === 1) {
      cells.forEach(cell => cell.explode())
      cells.forEach(cell => cell.clear())
    } else {
      cells.forEach(cell => cell.plant())
    }
  }

  if (n <= 5) for (let i = 1; i <= n; i++) run(i)
  else for (let i = 1; i <= (n % 4) + 4; i++) run(i)

  return cellGrid.map(row => row.map(cell => cell.value()).join(''))
}
