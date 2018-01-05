#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data.map((row) => {
      const [speed, runTime, restTime] = row.match(/(\d+)/g);
      return [parseInt(speed, 10), parseInt(runTime, 10), parseInt(restTime, 10)];
    });

    function* stepper([speed, runTime, restTime]) {
      let [currentLength, remainingTime, isRunning] = [0, runTime, true];

      while (true) {
        if (isRunning) {
          currentLength += speed;
        }
        remainingTime -= 1;

        if (!remainingTime) {
          isRunning = !isRunning;
          remainingTime = isRunning ? runTime : restTime;
        }

        yield currentLength;
      }
    }

    const run = (deers, counterFunction = x => x) => {
      const steppers = deers.map(stepper);
      const endTime = 2503;
      let result = Array(input.length).fill(0);
      for (let time = 0; time < endTime; time += 1) {
        const currentState = steppers.map(step => step.next().value);
        result = counterFunction(currentState, result);
      }
      console.log(Math.max(...result));
    };

    const part1 = () => {
      run(input);
    };

    const part2 = () => {
      const counterFunction = (currentState, result) => {
        result[currentState.indexOf(Math.max(...currentState))] += 1;
        return result;
      };

      run(input, counterFunction);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
