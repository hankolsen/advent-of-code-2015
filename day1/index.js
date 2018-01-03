#!/usr/bin/env node
/* eslint no-confusing-arrow: 0 */
const { getRow } = require('../utils');

getRow()
  .then((data) => {

    const input = [...data].map(char => char === '(' ? 1 : -1);

    let basementStep;

    const finalFloor = input.reduce((acc, val, index) => {
      const floor = acc + val;
      if (!basementStep && floor < 0) {
        basementStep = index + 1;
      }
      return floor;
    }, 0);

    console.log(finalFloor);
    console.log(basementStep);


  })
  .catch(err => console.log(`There was an error\n${err}`));
