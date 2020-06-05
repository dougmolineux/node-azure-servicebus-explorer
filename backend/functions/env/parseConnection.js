const {
  prefixes,
  delimiters: { internal: delimiter },
} = require('./constants');

const trim = (x) => x.trim();

const extractSuffix = (str = '', prefix = '') => {
  const suffix = str.replace(prefix, '');
  return str !== suffix && prefix + suffix === str && suffix;
};

const logInvalid = (connection) => {
  console.log(
    '\nInvalid saved connection' +
      '\n------------------------' +
      `\n${connection}\n`
  );
  return null;
};

const parseConnection = (connection) => {
  const parts = connection.split(delimiter).map(trim);
  const connString = extractSuffix(parts[0], prefixes.connString);
  const topic = extractSuffix(parts[1], prefixes.topic);
  const sub = extractSuffix(parts[2], prefixes.sub);
  return connString && topic && sub && parts.length === 3
    ? { connString, topic, sub }
    : logInvalid(connection);
};

module.exports = parseConnection;
