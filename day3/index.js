#!/usr/bin/env node
const { getRow } = require('../utils');

getRow()
  .then((data) => {

    const directions = {
      '^': [0, 1],
      '>': [1, 0],
      'v': [0, -1],
      '<': [-1, 0],
    };

    let deliveredHouses = { '0,0': 1 };

    const deliver = ([x, y]) => {
      const key = `${x},${y}`;
      deliveredHouses[key] = (deliveredHouses[key] += 1) || 1;
    };

    const move = (startPosition, direction) => [startPosition[0] + directions[direction][0], startPosition[1] + directions[direction][1]];

    const moveAndDeliver = (startPosition, direction) => {
      const newPosition = move(startPosition, direction);
      deliver(newPosition);
      return newPosition;
    };


    const part1 = () => {
      [...data].reduce((startPosition, direction) => moveAndDeliver(startPosition, direction), [0, 0]);
      console.log(Object.keys(deliveredHouses).length);
    };

    const part2 = () => {
      const santaInstructions = [];
      const roboSantaInstructions = [];

      [...data].forEach((row, index) => {
        if (index % 2) {
          santaInstructions.push(row);
        } else {
          roboSantaInstructions.push(row);
        }
      });

      deliveredHouses = { '0,0': 1 };
      santaInstructions.reduce((startPosition, direction) => moveAndDeliver(startPosition, direction), [0, 0]);
      roboSantaInstructions.reduce((startPosition, direction) => moveAndDeliver(startPosition, direction), [0, 0]);
      console.log(Object.keys(deliveredHouses).length);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
