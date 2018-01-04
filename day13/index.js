#!/usr/bin/env node
/* eslint no-param-reassign: 0, no-confusing-arrow: 0 */
const { getRows, permutator } = require('../utils');

getRows()
  .then((data) => {

    const happinessMap = data
      .map((row) => {
        const [, person, direction, value, target] = row.match(/(\w+).*(lose|gain) (\d+).* (\w+)\./);
        return { person, target, value: direction === 'gain' ? +value : -value };
      })
      .reduce((map, obj) => {
        map[obj.person] = { ...map[obj.person], [obj.target]: obj.value };
        return map;
      }, {});


    const nextPerson = (row, index) => row[(index + 1) % row.length];
    const nextPersonWithMe = (row, index) => index + 1 === row.length ? 'Me' : nextPerson(row, index);
    const coupleHappiness = (a, b) => b === 'Me' ? 0 : happinessMap[a][b] + happinessMap[b][a];

    const part1 = () => {
      let max = -1;
      permutator(Object.keys(happinessMap)).forEach((row) => {
        const result = row.reduce((sum, person, index) => sum + coupleHappiness(person, nextPerson(row, index)), 0);
        max = Math.max(max, result);
      });
      console.log(max);
    };

    const part2 = () => {
      let max = -1;
      permutator(Object.keys(happinessMap)).forEach((row) => {
        const result = row.reduce((sum, person, index) => sum + coupleHappiness(person, nextPersonWithMe(row, index)), 0);
        max = Math.max(max, result);
      });
      console.log(max);
    };


    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
