#!/usr/bin/env node
const { getRow } = require('../utils');

getRow()
  .then((data) => {

    const input = data;

    const test3Consecutive = string => [...string].map(x => x.charCodeAt()).find((n, i, arr) => n === (arr[i + 1] - 1) && n === arr[i + 2] - 2);
    const testDoubles = string => string.match(/(.)\1.*(.)\2/);
    const testForbiddenCharacters = string => !(string.match(/[iol]/) || []).length;
    const isValidPassword = password => [test3Consecutive, testDoubles, testForbiddenCharacters].every(test => test(password));


    console.log(isValidPassword(input));

  })
  .catch(err => console.log(`There was an error\n${err}`));
