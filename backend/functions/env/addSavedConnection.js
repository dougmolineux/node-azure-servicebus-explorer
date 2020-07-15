const {
  files: { saved: file },
  messages: { unknownError },
} = require('./constants');
const {
  respondFailed,
  writeConnectionToFile,
} = require('./writeConnectionToFile');

const logError = (error) =>
  console.log('Failed to add saved connection with error:', error);

const addSavedConnection = async (connection) => {
  try {
    return await writeConnectionToFile({ connection, file });
  } catch (error) {
    logError(error);
    return respondFailed(unknownError);
  }
};

const httpAddSavedConnection = async (ctx) => {
  try {
    ctx.body = await addSavedConnection(ctx.request.body);
  } catch (error) {
    logError(error);
    ctx.body = respondFailed(unknownError);
  }
};

module.exports = { addSavedConnection, httpAddSavedConnection };
