const {
  httpAddSavedConnection: addSavedConnection,
} = require('./addSavedConnection');
const {
  httpGetSavedConnections: getSavedConnections,
} = require('./getSavedConnections');
const {
  httpSetEnvToConnection: setEnvToConnection,
} = require('./setEnvToConnection');

module.exports = {
  addSavedConnection,
  getSavedConnections,
  setEnvToConnection,
};
