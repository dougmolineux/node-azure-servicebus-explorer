const isPopulated = require('../isPopulated');

const isValidConnectionObject = (connection) => {
  const { connString, topic, sub } = connection;
  return [connString, topic, sub].every(isPopulated);
};

module.exports = isValidConnectionObject;
