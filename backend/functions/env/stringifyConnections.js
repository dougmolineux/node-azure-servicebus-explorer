const {
  delimiters: { external: delimiter },
} = require('./constants');
const stringifyConnection = require('./stringifyConnection');

const stringifyConnections = (connections) =>
  connections.map(stringifyConnection).join(delimiter);

module.exports = stringifyConnections;
