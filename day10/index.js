#!/usr/bin/env node
/* eslint no-bitwise: 0, no-mixed-operators: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data[0];

    const lookAndSay = str => str.match(/(.)\1*/g).reduce((result, chars) => result + chars.length + chars[0], '');
    const repeat = (turns, string) => [...Array(turns)].reduce(lookAndSay, string);

    const result1 = repeat(40, input);
    const result2 = repeat(10, result1);

    console.log(result1.length, result2.length);

  })
  .catch(err => console.log(`There was an error\n${err}`));
