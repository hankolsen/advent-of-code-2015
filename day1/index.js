#!/usr/bin/env node
/* eslint no-confusing-arrow: 0, no-param-reassign: 0 */
const { getRow } = require('../utils');

getRow()
  .then((data) => {

    const input = [...data].map(char => char === '(' ? 1 : -1);

    let basementStep;

    const finalFloor = input.reduce((floor, direction, index) => {
      floor += direction;
      if (!basementStep && floor < 0) {
        basementStep = index + 1;
      }
      return floor;
    }, 0);

    console.log(finalFloor);
    console.log(basementStep);


  })
  .catch(err => console.log(`There was an error\n${err}`));
