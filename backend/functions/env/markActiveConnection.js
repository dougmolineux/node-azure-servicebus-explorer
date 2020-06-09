const isShallowMatch = require('../isShallowMatch');
const {
  files: { env },
} = require('./constants');
const parseConnections = require('./parseConnections');

const markActiveConnection = async (connections) => {
  try {
    const envConnections = await parseConnections(env);
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
