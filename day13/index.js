#!/usr/bin/env node
/* eslint no-param-reassign: 0, no-confusing-arrow: 0 */
const { getRows, permutator } = require('../utils');

getRows()
  .then((data) => {

    const happinessMap = data
      .map((row) => {
        const [, person, direction, value, target] = row.match(/(\w+).*(lose|gain) (\d+).* (\w+)\./);
        return [person, target, direction === 'gain' ? +value : -value];
      })
      .reduce((map, [person, target, value]) => {
        map[person] = { ...map[person], [target]: value };
        return map;
      }, {});

    const nextPerson = (row, index) => row[(index + 1) % row.length];
    const nextPersonWithMe = (row, index) => index + 1 === row.length ? 'Me' : nextPerson(row, index);
    const coupleHappiness = (a, b) => b === 'Me' ? 0 : happinessMap[a][b] + happinessMap[b][a];


    const findMaxHappiness = (nextPersonFunction) => {
      let max = -1;
      permutator(Object.keys(happinessMap)).forEach((row) => {
        const result = row.reduce((sum, person, index) => sum + coupleHappiness(person, nextPersonFunction(row, index)), 0);
        max = Math.max(max, result);
      });
      return max;
    };

    const part1 = () => {
      console.log(findMaxHappiness(nextPerson));
    };

    const part2 = () => {
      console.log(findMaxHappiness(nextPersonWithMe));
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
