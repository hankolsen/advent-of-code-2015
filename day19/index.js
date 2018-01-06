#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data;
    const [...molecules] = [...input.splice(input.length - 1, 1)].map(row => row.match(/([A-Z][a-z]?)/g))[0];

    // Remove empty line between replacements and molecules in the data
    input.splice(input.length - 1, 1);

    const replacements = input.reduce((map, row) => {
      const [key, value] = row.split(' => ');
      map[key] = [...map[key] || [], value];
      return map;
    }, {});


    const part1 = (molecules) => {
      const result = new Set();
      molecules.forEach((molecule, index) => {
        if (replacements[molecule]) {
          replacements[molecule].forEach((replacement) => {
            const newMolecules = [...molecules];
            newMolecules[index] = replacement;
            result.add(newMolecules.join(''));
          });
        }
      });

      console.log(result.size);
    };

    const part2 = () => {
    };

    part1(molecules);
    part2();


  })
  .catch(err => console.log(`There was an error\n${err}`));
