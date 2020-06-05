const readFile = require('../readFile');
const {
  files: { saved },
  delimiters: { external: delimiter },
} = require('./constants');
const parseConnection = require('./parseConnection');

const getSavedConnections = async (ctx) => {
  try {
    const fileContents = await readFile(saved);
    const connections = fileContents
      .split(delimiter)
      .map(parseConnection)
      .filter(Boolean);
    ctx.body = connections;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getSavedConnections;
