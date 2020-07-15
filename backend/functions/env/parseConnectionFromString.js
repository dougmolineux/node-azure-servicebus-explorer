const {
  delimiters: { internal: delimiter },
  prefixes,
} = require('./constants');

const trim = (x) => x.trim();

const extractSuffix = (str = '', prefix = '') => {
  const suffix = str.replace(prefix, '');
  return str !== suffix && prefix + suffix === str && suffix;
};

const logInvalid = (connection) => {
  console.log(
    '\nInvalid connection string' +
      '\n-------------------------' +
      `\n${connection}\n`
  );
  return null;
};

const parseConnectionFromString = (connection) => {
  const parts = connection.split(delimiter).map(trim);
  const connString = extractSuffix(parts[0], prefixes.connString);
  const topic = extractSuffix(parts[1], prefixes.topic);
  const sub = extractSuffix(parts[2], prefixes.sub);
  return connString && topic && sub && parts.length === 3
    ? { connString, topic, sub }
    : logInvalid(connection);
};

module.exports = parseConnectionFromString;
