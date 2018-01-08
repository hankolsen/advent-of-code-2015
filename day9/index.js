#!/usr/bin/env node
/* eslint no-bitwise: 0, no-mixed-operators: 0 */
const { getRows, permutator } = require('../utils');

getRows()
  .then((data) => {

    const input = data.map(row => {
      const [,start, end, distance] = row.match(/(\w+) to (\w+) = (\d+)/);
      return [start, end, parseInt(distance, 10)];
    }).reduce((map, [start, end, distance]) => {
      map[start] = {...map[start], [end]: distance };
      map[end] = {...map[end], [start]: distance };
      return map;
    }, {});

    const part1 = () => {
      const combinations = permutator(Object.keys(input));
      let shortestDistance = Number.MAX_SAFE_INTEGER;
      let longestDistance = 0;

      combinations.forEach((combination) => {
        let startCity = combination.shift();
        const distance = combination.reduce((totalDistance, city) => {
          totalDistance += input[startCity][city];
          startCity = city;
          return totalDistance;
        }, 0);

        shortestDistance = Math.min(shortestDistance, distance);
        longestDistance = Math.max(longestDistance, distance);
      });

      console.log(shortestDistance);
      console.log(longestDistance);
    };

    part1();

  })
  .catch(err => console.log(`There was an error\n${err}`));
