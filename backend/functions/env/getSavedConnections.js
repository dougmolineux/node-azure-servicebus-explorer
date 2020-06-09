const {
  files: { saved },
} = require('./constants');
const markActiveConnection = require('./markActiveConnection');
const parseConnections = require('./parseConnections');

const logError = (error) =>
  console.log('Failed to get saved connections with error:', error);

const getSavedConnections = async () => {
  try {
    const connections = await parseConnections(saved);
    return await markActiveConnection(connections);
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
