#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getRows, permutator } = require('../utils');

getRows()
  .then((data) => {

    const input = data
      .map((row) => {
        const [, person, direction, value, target] = row.match(/(\w+).*(lose|gain) (\d+).* (\w+)\./);
        return { person, target, value: direction === 'gain' ? +value : -value };
      })
      .reduce((map, obj) => {
        map[obj.person] = { ...map[obj.person], [obj.target]: obj.value };
        return map;
      }, {});

    const part1 = () => {
      let max = -1;
      permutator(Object.keys(input)).forEach((row) => {
        const result = row.reduce((sum, person, index) => sum + input[person][row[(index + 1) % row.length]] + input[row[(index + 1) % row.length]][person], 0);
        max = Math.max(max, result);
      });
      console.log(max);
    };

    const part2 = () => {

    };


    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
