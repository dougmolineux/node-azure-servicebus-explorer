const {
  httpAddSavedConnection: addSavedConnection,
} = require('./addSavedConnection');
const {
  httpGetSavedConnections: getSavedConnections,
} = require('./getSavedConnections');

module.exports = { addSavedConnection, getSavedConnections };
