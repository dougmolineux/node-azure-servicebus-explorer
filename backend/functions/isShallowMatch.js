const isDefined = require('./isDefined');

const hasSameNumKeys = (a, b) =>
  Object.keys(a).length === Object.keys(b).length;

const isShallowMatch = (a, b) =>
  isDefined(a) &&
  isDefined(b) &&
  Object.keys(a).every((key) => a[key] === b[key]) &&
  hasSameNumKeys(a, b);

module.exports = isShallowMatch;
