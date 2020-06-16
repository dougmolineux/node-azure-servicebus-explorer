const isPopulated = require('../isPopulated');
const readFile = require('../readFile');
const {
  delimiters: { external: delimiter },
} = require('./constants');
const parseConnectionFromString = require('./parseConnectionFromString');

const processFileContents = (fileContents = '') =>
  isPopulated(fileContents)
    ? fileContents
        .split(delimiter)
        .map(parseConnectionFromString)
        .filter(Boolean)
    : [];

const parseConnectionsFromFile = async (file) => {
  try {
    const fileContents = await readFile(file);
    return processFileContents(fileContents);
  } catch (error) {
    console.log('Failed to parse connections from file with error:', error);
    return [];
  }
};

module.exports = parseConnectionsFromFile;
