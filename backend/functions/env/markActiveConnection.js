const isShallowMatch = require('../isShallowMatch');
const {
  files: { env },
} = require('./constants');
const parseConnectionsFromFile = require('./parseConnectionsFromFile');

const markActiveConnection = async (connections) => {
  try {
    const envConnections = await parseConnectionsFromFile(env);
    const activeConnection = envConnections[0];
    return connections.map((x) => ({
      ...x,
      isActive: isShallowMatch(x, activeConnection),
    }));
  } catch (error) {
    console.log('Failed to mark active connection with error:', error);
    return connections.map((x) => ({ ...x, isActive: false }));
  }
};

module.exports = markActiveConnection;
