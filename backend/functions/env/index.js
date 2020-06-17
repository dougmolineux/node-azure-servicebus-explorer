const {
  httpAddSavedConnection: addSavedConnection,
} = require('./addSavedConnection');
const {
  httpGetSavedConnections: getSavedConnections,
} = require('./getSavedConnections');
const {
  httpRemoveSavedConnection: removeSavedConnection,
} = require('./removeSavedConnection');
const {
  httpSetEnvToConnection: setEnvToConnection,
} = require('./setEnvToConnection');

module.exports = {
  addSavedConnection,
  getSavedConnections,
  removeSavedConnection,
  setEnvToConnection,
};
