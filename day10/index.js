#!/usr/bin/env node
/* eslint no-bitwise: 0, no-mixed-operators: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    let input = data[0];

    const count = (str) => str.match(/(.)\1*/g).reduce((result, chars) => result + chars.length + chars[0], '');

    const part1 = () => {
      const numberOfTurns = 40;
      for (let i = 0; i < numberOfTurns; i += 1) {
        input = count(input);
      }
      console.log(input.length);
    };

    const part2 = () => {
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
