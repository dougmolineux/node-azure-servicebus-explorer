const isDefined = require('./isDefined');

const isPopulated = (val) => isDefined(val) && val !== '';

module.exports = isPopulated;
