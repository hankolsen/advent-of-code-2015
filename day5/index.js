#!/usr/bin/env node
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data;

    const part1 = () => {
      const filtered = input
        .filter(row => !row.match(/ab|cd|pq|xy/))
        .filter(row => row.match(/(\w)\1+/))
        .filter(row => row.match(/(?:[aeiou].*?){3}/));
      console.log(filtered.length);
    };


    const part2 = () => {
      const filtered = input
        .filter(row => row.match(/(\w{2}).*?\1/))
        .filter(row => row.match(/(\w).\1/));
      console.log(filtered.length);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
