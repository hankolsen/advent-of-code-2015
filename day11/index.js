#!/usr/bin/env node
const { getRow } = require('../utils');

getRow()
  .then((data) => {

    const input = data;

    const [i, l, o, z] = [105, 108, 111, 122];
    const test3Consecutive = string => [...string].map(x => x.charCodeAt()).find((n, i, arr) => n === (arr[i + 1] - 1) && n === arr[i + 2] - 2);
    const testDoubles = string => string.match(/(.)\1.*(.)\2/);
    const testForbiddenCharacters = string => !(string.match(/[iol]/) || []).length;
    const isValidPassword = password => [test3Consecutive, testDoubles, testForbiddenCharacters].every(test => test(password));
    const concatPassword = (password, position, newChar) => password.substr(0, position) + newChar + password.substr(position + 1);
    const findNewPassword = (password, position = password.length - 1) => {
      let charCode = password.charCodeAt(position);
      if (charCode === z) {
        password = concatPassword(password, position, 'a');
        return findNewPassword(password, position - 1);
      }
      charCode += 1;

      // i, l, o are not allowed
      if (charCode === i || charCode === l || charCode === o) {
        charCode += 1;
      }

      password = concatPassword(password, position, String.fromCharCode(charCode));
      return password;
    };


    const part1 = (password) => {
      password = findNewPassword(password);
      while (!isValidPassword(password)) {
        password = findNewPassword(password);
      }

      return password;
    };

    const resultPart1 = part1(input);
    console.log(resultPart1);
    console.log(part1(resultPart1));

  })
  .catch(err => console.log(`There was an error\n${err}`));
