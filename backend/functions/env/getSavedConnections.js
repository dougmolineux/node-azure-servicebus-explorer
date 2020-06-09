const readFile = require('../readFile');
const {
  files: { saved },
  delimiters: { external: delimiter },
} = require('./constants');
const parseConnection = require('./parseConnection');

const logError = (error) =>
  console.log('Failed to get saved connections with error:', error);

const getSavedConnections = async () => {
  try {
    const fileContents = await readFile(saved);
    return fileContents.split(delimiter).map(parseConnection).filter(Boolean);
  } catch (error) {
    logError(error);
    return [];
  }
};

const httpGetSavedConnections = async (ctx) => {
  try {
    ctx.body = await getSavedConnections();
  } catch (error) {
    logError(error);
    ctx.body = [];
  }
};

module.exports = { getSavedConnections, httpGetSavedConnections };
