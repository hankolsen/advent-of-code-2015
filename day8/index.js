#!/usr/bin/env node
/* eslint no-bitwise: 0, no-mixed-operators: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const escapeRegEx = /\\(?:"|\\)/g;
    const charRegEx = /\\x[0-9a-f]{2}/g;
    const clean = string => string.replace(escapeRegEx, '');
    const matchLength = (string, regex) => (string.match(regex) || []).length;

    const count = (func, input) => input.reduce((sum, row) => sum + func(row), 0);

    const part1 = () => {
      const findLength = string => 2 + matchLength(string, escapeRegEx) + 3 * matchLength(clean(string), charRegEx);
      console.log(count(findLength, data));
    };

    const part2 = () => {
      const findLength = string => 4 + 2 * matchLength(string, escapeRegEx) + matchLength(clean(string), charRegEx);
      console.log(count(findLength, data));
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
