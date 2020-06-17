const fs = require('fs').promises;
const arrayMinusElement = require('../arrayMinusElement');
const {
  files: { saved: file },
  messages: { connectionNotFound, unknownError },
} = require('./constants');
const parseConnectionsFromFile = require('./parseConnectionsFromFile');
const stringifyConnections = require('./stringifyConnections');
const { respondFailed, respondSucceeded } = require('./writeConnectionToFile');

const logError = (error) =>
  console.log('Failed to remove saved connection with error:', error);

const removeSavedConnection = async (connection) => {
  try {
    const connections = await parseConnectionsFromFile(file);
    const minusMatches = arrayMinusElement(connections, connection);
    if (minusMatches.length === connections.length) {
      return respondFailed(connectionNotFound);
    }
    await fs.writeFile(file, stringifyConnections(minusMatches));
    return respondSucceeded('Removed saved connection.');
  } catch (error) {
    logError(error);
    return respondFailed(unknownError);
  }
};

const httpRemoveSavedConnection = async (ctx) => {
  try {
    ctx.body = await removeSavedConnection(ctx.request.body);
  } catch (error) {
    logError(error);
    ctx.body = respondFailed(unknownError);
  }
};

module.exports = { removeSavedConnection, httpRemoveSavedConnection };
