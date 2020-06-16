const isPopulated = require('../isPopulated');

const isValidConnection = (connection) => {
  const { connString, topic, sub } = connection;
  return [connString, topic, sub].every(isPopulated);
};

module.exports = isValidConnection;
