#!/usr/bin/env node
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data.map((row) => {
      const [l, w, h] = row.split('x');
      const paperNeed = (2 * l * w) + (2 * w * h) + (2 * h * l) + Math.min(l * w, w * h, h * l);
      const sortedSides = [l, w, h].sort((a, b) => parseInt(a, 10) > parseInt(b, 10));
      const ribbonNeed = (2 * sortedSides[0]) + (2 * sortedSides[1]) + (l * w * h);
      return { paperNeed, ribbonNeed };
    });

    console.log(input.reduce((acc, row) => acc + row.paperNeed, 0));
    console.log(input.reduce((acc, row) => acc + row.ribbonNeed, 0));

  })
  .catch(err => console.log(`There was an error\n${err}`));
