#!/usr/bin/env node
/* eslint no-mixed-operators: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data.map((row) => {
      const [l, w, h] = row.split('x').map(s => parseInt(s, 10)).sort((a, b) => a > b);
      const paperNeed = 2 * (l * w + w * h + h * l) + l * w;
      const ribbonNeed = 2 * (l + w) + l * w * h;
      return { paperNeed, ribbonNeed };
    });

    console.log(input.reduce(([paper, ribbon], row) => [paper + row.paperNeed, ribbon + row.ribbonNeed], [0, 0]));

  })
  .catch(err => console.log(`There was an error\n${err}`));
