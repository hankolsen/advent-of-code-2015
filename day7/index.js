#!/usr/bin/env node
/* eslint no-bitwise: 0, no-mixed-operators: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {


    const getInput = () => data.map((row) => {
      const [command, destination] = row.split(' -> ');
      const [operation] = command.match(/[A-Z]+/) || [];
      const [x, y] = command.match(/[a-z]+|\d+/g);
      return { [destination]: { x, y, operation: operation || 'PUT' } };
    });

    const operations = {
      PUT: x => parseInt(x, 10),
      OR: (x, y) => x | y,
      AND: (x, y) => x & y,
      LSHIFT: (x, y) => x << y,
      RSHIFT: (x, y) => x >> y,
      NOT: x => ~x,
    };

    const getSignal = (circuit, id) => {
      const wire = circuit[id];

      if (!wire) {
        return parseInt(id, 10);
      }

      const { operation, x, y } = wire;
      if (!wire.value) {
        wire.x = getSignal(circuit, x);
        wire.y = y && getSignal(circuit, y);
        wire.value = operations[operation](wire.x, wire.y);
      }

      return wire.value;
    };

    let a;
    const part1 = () => {
      const circuit = Object.assign({}, ...getInput());
      a = getSignal(circuit, 'a');
      console.log(a);
    };

    const part2 = () => {
      const circuit = Object.assign({}, ...getInput());
      circuit.b.value = a;
      const signal = getSignal(circuit, 'a');
      console.log(signal);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
