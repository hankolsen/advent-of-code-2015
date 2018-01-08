#!/usr/bin/env node
const { getRow } = require('../utils');

getRow()
  .then((data) => {

    let [, row, column] = data.match(/\D*(\d+)\D*(\d+)/);
    [row, column] = [row, column].map(x => parseInt(x, 10));

    const startValue = 20151125;
    const factor = 252533;
    const divisor = 33554393;

    const nextValue = currentValue => currentValue * factor % divisor;

    const part1 = () => {
      const n = (column + row - 2);
      const numberOfSteps = n * (n + 1) / 2 + column;
      let i = 1;
      let value = startValue;
      while (i < numberOfSteps) {
        value = nextValue(value);
        i += 1;
      }
      console.log(value);
    };



    const part2 = () => {

    };

    part1();
    part2();


  })
  .catch(err => console.log(`There was an error\n${err}`));
