#!/usr/bin/env node
/* eslint no-confusing-arrow: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const grid = data.map(row => row.split('').map(char => char === '#' ? 1 : 0));
    let state = [...grid];

    const onEdge = x => x === 0 || x === state.length - 1;
    let isPart2 = false;

    const getNeighbors = (x, y) => {
      let neighbours = [];
      for (let x1 = Math.max(0, x - 1); x1 <= Math.min(x + 1, state.length - 1); x1 += 1) {
        for (let y1 = Math.max(0, y - 1); y1 <= Math.min(y + 1, state.length - 1); y1 += 1) {
          if (x1 !== x || y1 !== y) {
            neighbours = [...neighbours, [x1, y1]];
          }
        }
      }
      return neighbours.reduce((sum, [x1, y1]) => {
        let current = state[y1][x1];
        if (isPart2 && onEdge(x1) && onEdge(y1)) {
          current = 1;
        }
        return sum + current;
      }, 0);
    };


    function* step(x, y) {
      while (true) {
        let currentPos = state[y][x];
        const neighbours = getNeighbors(x, y, state);
        if (currentPos) {
          currentPos = neighbours === 2 || neighbours === 3 || isPart2 && onEdge(x) && onEdge(y);
        } else {
          currentPos = neighbours === 3;
        }
        yield currentPos ? 1 : 0;
      }
    }

    const part1 = () => {

      const steppers = state.map((row, y) => row.map((col, x) => step(x, y)));
      steppers.map(row => row.map(stepper => stepper.next(state).value));
      const numberOfSteps = 100;
      for (let i = 0; i < numberOfSteps; i += 1) {
        state = steppers.map(row => row.map(stepper => stepper.next().value));
      }

      console.log(state.reduce((sum, row) => sum + row.reduce((sum2, val) => sum2 + val, 0), 0));
    };

    const part2 = () => {
      isPart2 = true;
      state = [...grid];
      part1();
    };

    part1();
    part2();


  })
  .catch(err => console.log(`There was an error\n${err}`));
