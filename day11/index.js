#!/usr/bin/env node
const { getRow } = require('../utils');

getRow()
  .then((data) => {

    const input = data;

    const test3Consecutive = string => [...string].map(x => x.charCodeAt()).find((n, i, arr) => n === (arr[i + 1] - 1) && n === arr[i + 2] - 2);
    const testDoubles = string => string.match(/(.)\1.*(.)\2/);
    const testForbiddenCharacters = string => !(string.match(/[iol]/) || []).length;
    const isValidPassword = password => [test3Consecutive, testDoubles, testForbiddenCharacters].every(test => test(password));
    const findNewPassword = (password, position = password.length - 1) => {
      let charCode = password.charCodeAt(position);
      if (charCode === 122) {
        password = password.substr(0, position) + 'a' + password.substr(position + 1);
        return findNewPassword(password, position - 1);
      }
      charCode += 1;

      // i, l, o are not allowed
      if (charCode === 105 || charCode === 108 || charCode === 111) {
        charCode += 1;
      }

      password = password.substr(0, position) + String.fromCharCode(charCode) + password.substr(position + 1);
      return password;
    };


    const part1 = () => {
      let password = input;
      while (!isValidPassword(password)) {
        password = findNewPassword(password);
      }

      console.log(password);
    };

    part1();

  })
  .catch(err => console.log(`There was an error\n${err}`));
