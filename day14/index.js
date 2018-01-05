#!/usr/bin/env node
/* eslint no-mixed-operators: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data.map((row) => {
      const [, name, speed, runTime, restTime] = row.match(/^(\w+).*\s(\d+).*\s(\d+) seconds.*\s(\d+) seconds\.$/);
      return [name, +speed, +runTime, +restTime];
    });


    const part1 = () => {
      const endTime = 2503;
      const result = input.map(([name, speed, runTime, restTime]) => {
        const lapTime = runTime + restTime;
        const fullLaps = Math.floor(endTime / lapTime);
        const partLaps = endTime % lapTime;
        const totalLength = (fullLaps * runTime + (partLaps > runTime ? runTime : partLaps)) * speed;
        return [name, totalLength];
      });
      result.sort(([, aLength], [, bLength]) => aLength < bLength);
      console.log(result[0][1]);
    };

    const part2 = () => {

    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
