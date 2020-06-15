const {
  delimiters: { internal: delimiter },
  prefixes,
} = require('./constants');

const stringifyConnectionObject = (connection) =>
  `${prefixes.connString}${connection.connString}${delimiter}` +
  `${prefixes.topic}${connection.topic}${delimiter}` +
  `${prefixes.sub}${connection.sub}`;

module.exports = stringifyConnectionObject;
