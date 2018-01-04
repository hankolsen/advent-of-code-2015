#!/usr/bin/env node
const { getRow } = require('../utils');

getRow()
  .then((data) => {

    const input = JSON.parse(data);

    const sum = (o, isPart2) => {
      if (!(o instanceof Object)) {
        // String or Number
        return Number.isInteger(o) ? o : 0;
      }

      if (isPart2 && !Array.isArray(o) && Object.values(o).includes('red')) {
        // Object with a value of red
        return 0;
      }

      // Array
      return Object.values(o).reduce((res, val) => res + sum(val, isPart2), 0);
    };

    console.log(sum(input));
    console.log(sum(input, true));


  })
  .catch(err => console.log(`There was an error\n${err}`));
