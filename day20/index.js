#!/usr/bin/env node
const { getRow } = require('../utils');

getRow()
  .then((data) => {

    const target = parseInt(data, 10);

    const factorise = (n) => {
      const factors = [1];
      for (let i = 2; i <= Math.sqrt(n); i += 1) {
        if (n % i === 0) {
          factors.push(i);
          if (i * i !== n) {
            factors.push(n / i);
          }
        }
      }

      if (n > 1) {
        factors.push(n);
      }

      return factors.sort((a, b) => a - b);
    };

    const part1 = () => {
      let total = 0;
      let houseNumber = 0;
      while (total < target) {
        houseNumber += 1;
        total = factorise(houseNumber).reduce((sum, number) => sum + number, 0) * 10;
      }
      console.log(houseNumber);
    };

    const part2 = () => {
      let total = 0;
      let houseNumber = 0;
      const usedElves = {};
      while (total < target) {
        houseNumber += 1;
        const elves = factorise(houseNumber);
        elves.forEach((elf) => { usedElves[elf] = (usedElves[elf] || 0) + 1; });
        total = elves.reduce((sum, number) => sum + (usedElves[number] <= 50 ? number : 0), 0) * 11;
      }
      console.log(houseNumber);
    };

    part1();
    part2();


  })
  .catch(err => console.log(`There was an error\n${err}`));
