const files = {
  env: './.env',
  saved: './.saved',
};

const prefixes = {
  connString: `SERVICE_BUS_CONNECTION_STRING=`,
  topic: `TOPIC_NAME=`,
  sub: `SUBSCRIPTION_NAME=`,
};

const delimiters = {
  internal: `\n`,
  external: `\n\n`,
};

const messages = {
  unknownError: 'An unknown error occurred.',
  connectionNotFound: 'Could not find this connection in saved connections.',
};

module.exports = { files, prefixes, delimiters, messages };
