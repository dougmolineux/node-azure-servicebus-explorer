const fs = require('fs').promises;
const arrayMinusElement = require('../arrayMinusElement');
const {
  files: { saved: file },
  messages: { connectionNotFound, unknownError },
} = require('./constants');
const isValidConnection = require('./isValidConnection');
const parseConnectionsFromFile = require('./parseConnectionsFromFile');
const stringifyConnections = require('./stringifyConnections');
const {
  logInvalid,
  respondFailed,
  respondSucceeded,
} = require('./writeConnectionToFile');

const logError = (error) =>
  console.log('Failed to edit saved connection with error:', error);

const editSavedConnection = async (oldVersion, newVersion) => {
  if (!isValidConnection(newVersion)) {
    return logInvalid(newVersion);
  }
  try {
    const connections = await parseConnectionsFromFile(file);
    const minusMatches = arrayMinusElement(connections, oldVersion);
    if (minusMatches.length === connections.length) {
      return respondFailed(connectionNotFound);
    }
    await fs.writeFile(
      file,
      stringifyConnections([...minusMatches, newVersion])
    );
    return respondSucceeded('Edited saved connection.');
  } catch (error) {
    logError(error);
    return respondFailed(unknownError);
  }
};

const httpEditSavedConnection = async (ctx) => {
  try {
    const { oldVersion, newVersion } = ctx.request.body;
    ctx.body = await editSavedConnection(oldVersion, newVersion);
  } catch (error) {
    logError(error);
    ctx.body = respondFailed(unknownError);
  }
};

module.exports = { editSavedConnection, httpEditSavedConnection };
