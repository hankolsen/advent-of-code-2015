#!/usr/bin/env node
/* eslint no-bitwise: 0, no-mixed-operators: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const escapeRegEx = /\\(?:"|\\)/g;
    const charRegEx = /\\x[0-9a-f]{2}/g;
    const clean = string => string.replace(escapeRegEx, '');
    const matchLength = (string, regex) => (string.match(regex) || []).length;

    const part1 = () => {
      const result = data.map((row) => {
        return 2 + matchLength(row, escapeRegEx) + 3 * matchLength(clean(row), charRegEx);
      }).reduce((sum, length) => sum + length, 0);
      console.log(result);
    };

    const part2 = () => {
      const result = data.map((row) => {
        return 4 + 2 * matchLength(row, escapeRegEx) + matchLength(clean(row), charRegEx);
      }).reduce((sum, length) => sum + length, 0);
      console.log(result);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
