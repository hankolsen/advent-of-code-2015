/* eslint no-param-reassign: 0, no-bitwise: 0  */
const fs = require('fs');


const getData = () => new Promise((resolve, reject) => {
  fs.readFile('data.txt', 'ascii', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const getRows = () => getData().then(data => data.split('\n'));

const getRow = () => getRows().then(data => data[0]);


const applyLengths = (list, lengths, currentPosition = 0, skipSize = 0) => {
  const listSize = 256;
  lengths.forEach((length) => {
    list = [...list.slice(currentPosition), ...list.slice(0, currentPosition)];
    list = [...list.slice(0, length).reverse(), ...list.slice(length)];
    list = [...list.slice(-currentPosition), ...list.slice(0, -currentPosition)];
    currentPosition = (currentPosition + length + skipSize) % listSize;
    skipSize += 1;
  });
  return { result: list, currentPosition, skipSize };
};

const hashString = (str) => {
  const listSize = 256;
  let list = [...Array(listSize).keys()];
  const lengths = [...[...str].map(char => char.charCodeAt(0)), ...[17, 31, 73, 47, 23]];
  let currentPosition = 0;
  let skipSize = 0;

  Array(64).fill().forEach(() => {
    ({ result: list, currentPosition, skipSize } = applyLengths(list, lengths, currentPosition, skipSize));
  });

  // Create XOR hash
  let hash = '';
  Array(16).fill().forEach(() => {
    hash += list
      .splice(0, 16)
      .reduce((a, b) => a ^ b)
      .toString(16)
      .padStart(2, '0');
  });

  return hash;
};

const permutator = (inputArr) => {
  const result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i += 1) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

const powerSet = (list) => {
  const [set, listSize] = [[], list.length];
  const combinationsCount = (1 << listSize);

  let combination = [];
  for (let i = 1; i < combinationsCount; i += 1, set.push(combination)) {
    combination = [];
    for (let j = 0; j < listSize; j += 1) {
      if ((i & (1 << j))) {
        combination.push(list[j]);
      }
    }
  }
  return set;
};

module.exports = { applyLengths, getData, getRow, getRows, hashString, permutator, powerSet };
