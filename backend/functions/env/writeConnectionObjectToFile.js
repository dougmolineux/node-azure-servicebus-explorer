const fs = require('fs').promises;
const findElementIndex = require('../findElementIndex');
const {
  delimiters: { external: delimiter },
} = require('./constants');
const isValidConnectionObject = require('./isValidConnectionObject');
const parseConnectionObjectsFromFile = require('./parseConnectionObjectsFromFile');
const stringifyConnectionObject = require('./stringifyConnectionObject');

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

const writeConnectionObjectToFile = async ({
  connection,
  file,
  shouldOverwrite = false,
}) => {
  if (!isValidConnectionObject(connection)) {
    return logInvalid(connection);
  }
  try {
    const connections = shouldOverwrite
      ? []
      : await parseConnectionObjectsFromFile(file);
    if (findElementIndex(connections, connection) > -1) {
      return respondFailed('This connection already exists.');
    }
    const connectionsAsString = [...connections, connection]
      .map(stringifyConnectionObject)
      .join(delimiter);
    await fs.writeFile(file, connectionsAsString);
    return respondSucceeded(
      shouldOverwrite ? 'Overwrote file.' : 'Added to file.'
    );
  } catch (error) {
    console.log('Failed to write connection object to file with error:', error);
    return respondFailed('An unknown error occurred.');
  }
};

module.exports = writeConnectionObjectToFile;
