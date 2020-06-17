const isShallowMatch = require('./isShallowMatch');

const arrayMinusElement = (array, element) =>
  array.filter((x) => !isShallowMatch(x, element));

module.exports = arrayMinusElement;
