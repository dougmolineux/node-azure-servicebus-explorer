const fs = require('fs').promises;
const findElementIndex = require('../findElementIndex');
const {
  messages: { unknownError },
} = require('./constants');
const isValidConnection = require('./isValidConnection');
const parseConnectionsFromFile = require('./parseConnectionsFromFile');
const stringifyConnections = require('./stringifyConnections');

const respondFailed = (message) => ({ succeeded: false, message });

const respondSucceeded = (message = '') => ({ succeeded: true, message });

const logInvalid = (connection) => {
  console.log(
    '\nInvalid connection object' +
      '\n-------------------------' +
      `\n${JSON.stringify(connection)}\n`
  );
  return respondFailed('This connection is invalid.');
};

const writeConnectionToFile = async ({
  connection,
  file,
  shouldOverwrite = false,
}) => {
  if (!isValidConnection(connection)) {
    return logInvalid(connection);
  }
  try {
    const connections = shouldOverwrite
      ? []
      : await parseConnectionsFromFile(file);
    if (findElementIndex(connections, connection) > -1) {
      return respondFailed('This connection already exists.');
    }
    await fs.writeFile(
      file,
      stringifyConnections([...connections, connection])
    );
    return respondSucceeded(
      shouldOverwrite ? 'Overwrote file.' : 'Added to file.'
    );
  } catch (error) {
    console.log('Failed to write connection to file with error:', error);
    return respondFailed(unknownError);
  }
};

module.exports = { respondFailed, respondSucceeded, writeConnectionToFile };
