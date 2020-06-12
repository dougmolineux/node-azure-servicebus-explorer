const isShallowMatch = require('./isShallowMatch');

const findElementIndex = (array = [], element) =>
  array.findIndex((x) => isShallowMatch(x, element));

module.exports = findElementIndex;
