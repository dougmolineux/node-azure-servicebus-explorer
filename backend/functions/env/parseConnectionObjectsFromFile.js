const isPopulated = require('../isPopulated');
const readFile = require('../readFile');
const {
  delimiters: { external: delimiter },
} = require('./constants');
const parseConnectionObjectFromString = require('./parseConnectionObjectFromString');

const processFileContents = (fileContents = '') =>
  isPopulated(fileContents)
    ? fileContents
        .split(delimiter)
        .map(parseConnectionObjectFromString)
        .filter(Boolean)
    : [];

const parseConnectionObjectsFromFile = async (file) => {
  try {
    const fileContents = await readFile(file);
    return processFileContents(fileContents);
  } catch (error) {
    console.log(
      'Failed to parse connection objects from file with error:',
      error
    );
    return [];
  }
};

module.exports = parseConnectionObjectsFromFile;
