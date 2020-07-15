const {
  files: { env: file },
  messages: { unknownError },
} = require('./constants');
const {
  respondFailed,
  writeConnectionToFile,
} = require('./writeConnectionToFile');

const logError = (error) =>
  console.log('Failed to set env to connection with error:', error);

const setEnvToConnection = async (connection) => {
  try {
    return await writeConnectionToFile({
      connection,
      file,
      shouldOverwrite: true,
    });
  } catch (error) {
    logError(error);
    return respondFailed(unknownError);
  }
};

const httpSetEnvToConnection = async (ctx) => {
  try {
    ctx.body = await setEnvToConnection(ctx.request.body);
  } catch (error) {
    logError(error);
    ctx.body = respondFailed(unknownError);
  }
};

module.exports = { setEnvToConnection, httpSetEnvToConnection };
