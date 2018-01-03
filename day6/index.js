#!/usr/bin/env node
/* eslint no-confusing-arrow: 0, no-nested-ternary: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {


    const input = data.map((row) => {
      const [, string, x1, y1, x2, y2] = row.split(/(?:turn )?(\w+) (\d{1,3}),(\d{1,3}) through (\d{1,3}),(\d{1,3})/);
      return [string, [parseInt(x1, 10), parseInt(y1, 10)], [parseInt(x2, 10), parseInt(y2, 10)]];
    });

    const createGrid = () => [...Array(1000)].map(() => Array(1000).fill(0));

    const sumGrid = grid => grid.reduce((lit, row) => row.reduce((lit, value) => lit + value, lit), 0);

    const lightIt = ((instructions) => {
      const grid = createGrid();
      input.forEach(([instruction, [x1, y1], [x2, y2]]) => {
        for (let x = x1; x <= x2; x += 1) {
          for (let y = y1; y <= y2; y += 1) {
            grid[x][y] = instructions[instruction](grid[x][y]);
          }
        }
      });
      return grid;
    });

    const part1 = () => {
      const instructions = {
        on: () => 1,
        off: () => 0,
        toggle: value => !value,
      };
      const grid = lightIt(instructions);
      console.log(sumGrid(grid));
    };

    const part2 = () => {
      const instructions = {
        on: value => value + 1,
        off: value => Math.max(0, value - 1),
        toggle: value => value + 2,
      };
      const grid = lightIt(instructions);
      console.log(sumGrid(grid));
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
