const readFile = require('../readFile');
const {
  delimiters: { external: delimiter },
} = require('./constants');
const parseConnection = require('./parseConnection');

const parseConnections = async (file) => {
  try {
    const fileContents = await readFile(file);
    return fileContents.split(delimiter).map(parseConnection).filter(Boolean);
  } catch (error) {
    console.log('Failed to parse connections with error:', error);
    return [];
  }
};

module.exports = parseConnections;
