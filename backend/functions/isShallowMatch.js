const isDefined = require('./isDefined');

const isShallowMatch = (a, b) =>
  isDefined(a) &&
  isDefined(b) &&
  Object.keys(a).every((key) => a[key] === b[key]);

module.exports = isShallowMatch;
