const fs = require('fs').promises;
const findElementIndex = require('../findElementIndex');
const {
  delimiters: { external: delimiter },
} = require('./constants');
const parseConnectionObjectsFromFile = require('./parseConnectionObjectsFromFile');

const isValidConnection = (connection) => {
  // Need to fill in.
  return true;
};

const logInvalid = (connection) => {
  console.log(
    '\nInvalid connection' + '\n------------------' + `\n${connection}\n`
  );
  return { succeeded: false, message: 'This connection is invalid.' };
};

const stringifyConnectionObject = (connection) => {
  // Need to fill in.
  return '';
};

const writeConnectionObjectToFile = async ({
  connection,
  file,
  shouldOverwrite = false,
}) => {
  if (!isValidConnection(connection)) {
    return logInvalid(connection);
  }
  try {
    if (shouldOverwrite) {
      await fs.writeFile(file, stringifyConnectionObject(connection));
      return { succeeded: true, message: 'Overwrote file.' };
    } else {
      const connections = await parseConnectionObjectsFromFile(file);
      if (findElementIndex(connections, connection) > -1) {
        return { succeeded: false, message: 'This connection already exists.' };
      }
      const connectionsAsString = [...connections, connection]
        .map(stringifyConnectionObject)
        .join(delimiter);
      await fs.writeFile(file, connectionsAsString);
      return { succeeded: true, message: 'Added to file.' };
    }
  } catch (error) {
    console.log('Failed to write connection object to file with error:', error);
  }
};

module.exports = writeConnectionObjectToFile;
