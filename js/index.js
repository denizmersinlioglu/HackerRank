// MARK: - Bomberman Game

function bomberMan(n, grid) {
  class Cell {
    state = ".";
    neighbors = [];
    shouldClear = false;

    constructor(state) {
      this.state = state;
    }

    value = () => {
      if (this.state === ".") return ".";
      else return "O";
    };

    plant = () => {
      if (this.state === ".") this.state = "O";
      else this.state = "X";
    };

    explode = () => {
      this.shouldClear =
        this.state == "X" ||
        !!this.neighbors.filter((neighbor) => neighbor.state === "X").length;
    };

    clear = () => {
      if (this.shouldClear) {
        this.state = ".";
      }
    };
  }

  if (n === 1 || n === 0) {
    return grid;
  }
  let rowCount = grid.length;
  let columnCount = grid[0]?.length ?? 0;
  let newGrid = grid.map((row) => row.split(""));
  var cellGrid = [];

  for (let i = 0; i < rowCount; i++) {
    cellGrid[i] = [];
    for (let j = 0; j < columnCount; j++) {
      cellGrid[i].push(new Cell(newGrid[i][j]));
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
        (element) =>
          element[0] >= 0 &&
          element[0] < rowCount &&
          element[1] >= 0 &&
          element[1] < columnCount
      );
      cellGrid[i][j].neighbors = neighborIndexes.map(
        (element) => cellGrid[element[0]][element[1]]
      );
    }
  }

  const flat = cellGrid.flatMap((cell) => cell);
  const run = (i) => {
    if (i % 2 === 1) {
      flat.forEach((cell) => cell.explode());
      flat.forEach((cell) => cell.clear());
    } else {
      flat.forEach((cell) => cell.plant());
    }
  };

  if (n <= 5) {
    for (let i = 1; i <= n; i++) run(i);
  } else {
    for (let i = 1; i <= (n % 4) + 4; i++) run(i);
  }

  return cellGrid.map((row) => row.map((cell) => cell.value()).join(""));
}

console.log(
  bomberMan(9, [
    ".......",
    "...O.O.",
    "....O..",
    "..O....",
    "OO...OO",
    "OO.O...",
  ])
);
