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

module.exports = { files, prefixes, delimiters };
