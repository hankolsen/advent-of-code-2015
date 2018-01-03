#!/usr/bin/env node
const { getRow } = require('../utils');
const md5 = require('blueimp-md5');

getRow()
  .then((data) => {

    const input = data;

    const mine = (secret, number) => md5(secret + number);

    const part1 = () => {

      let number = 0;
      let hash = mine(input, number);
      while (!hash.startsWith('00000')) {
        number += 1;
        hash = mine(input, number);
      }

      console.log(number);

      while (!hash.startsWith('000000')) {
        number += 1;
        hash = mine(input, number);
      }

      console.log(number);
    };


    const part2 = () => {

    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
