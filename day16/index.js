#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const sues = data.map((row) => {
      const [, sue, compound1, amount1, compound2, amount2, compound3, amount3] = row.match(/(\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/);
      return { name: sue, compounds: { [compound1]: parseInt(amount1, 10), [compound2]: parseInt(amount2, 10), [compound3]: parseInt(amount3, 10) } };
    });

    const answer = {
      children: 3,
      cats: 7,
      samoyeds: 2,
      pomeranians: 3,
      akitas: 0,
      vizslas: 0,
      goldfish: 5,
      trees: 3,
      cars: 2,
      perfumes: 1,
    };

    const comparators = {
      cats: (a, b) => a < b,
      trees: (a, b) => a < b,
      pomeranians: (a, b) => a > b,
      goldfish: (a, b) => a > b,
    };

    const part1 = () => {
      const correctSue = sues.filter(({ compounds }) => Object.entries(compounds).every(([compound, value]) => answer[compound] === value));
      console.log(correctSue[0].name);
    };

    const part2 = () => {
      const correctSue = sues.filter(({ compounds }) => Object.entries(compounds).every(([compound, value]) => {
        if (comparators[compound]) {
          return comparators[compound](answer[compound], value);
        } else {
          return answer[compound] === value;
        }
      }));
      console.log(correctSue[0].name);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
