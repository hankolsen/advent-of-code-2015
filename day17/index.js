#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getRows, powerSet } = require('../utils');

getRows()
  .then((data) => {

    const containers = data.map(row => parseInt(row, 10)).sort((a, b) => a - b);
    const totalVolume = 150;
    const matches = powerSet(containers).filter(list => list.reduce((sum, container) => sum + container, 0) === totalVolume);

    const part1 = () => {
      console.log(matches.length);
    };

    const part2 = () => {
      const minimumContainers = matches.sort((a, b) => a.length - b.length)[0].length;
      const combinations = matches.filter(entries => entries.length === minimumContainers);
      console.log(combinations.length);

    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
