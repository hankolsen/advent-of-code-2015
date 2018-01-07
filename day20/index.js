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
        total = factorise(houseNumber).reduce((sum, number) => sum + (10 * number), 0);
      }
      console.log(total, houseNumber);
    };

    const part2 = () => {

    };

    part1();
    part2();


  })
  .catch(err => console.log(`There was an error\n${err}`));
