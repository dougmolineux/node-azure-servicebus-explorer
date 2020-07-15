const {
  httpAddSavedConnection: addSavedConnection,
} = require('./addSavedConnection');
const {
  httpEditSavedConnection: editSavedConnection,
} = require('./editSavedConnection');
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
  editSavedConnection,
  getSavedConnections,
  removeSavedConnection,
  setEnvToConnection,
};
