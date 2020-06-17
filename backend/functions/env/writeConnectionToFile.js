const fs = require('fs').promises;
const findElementIndex = require('../findElementIndex');
const {
  delimiters: { external: delimiter },
  messages: { unknownError },
} = require('./constants');
const isValidConnection = require('./isValidConnection');
const parseConnectionsFromFile = require('./parseConnectionsFromFile');
const stringifyConnection = require('./stringifyConnection');

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
    const connectionsAsString = [...connections, connection]
      .map(stringifyConnection)
      .join(delimiter);
    await fs.writeFile(file, connectionsAsString);
    return respondSucceeded(
      shouldOverwrite ? 'Overwrote file.' : 'Added to file.'
    );
  } catch (error) {
    console.log('Failed to write connection to file with error:', error);
    return respondFailed(unknownError);
  }
};

module.exports = { respondFailed, writeConnectionToFile };
