const fs = require('fs').promises;

module.exports = async function setEnv(ctx) {
  const envVars = ctx.request.body;

  const data = `SERVICE_BUS_CONNECTION_STRING=${envVars.connString}
TOPIC_NAME=${envVars.topic}
SUBSCRIPTION_NAME=${envVars.sub}`;

  try {
    await fs.writeFile('.env', data);
  } catch (error) {
    console.log(error);
  }

  ctx.body = ctx.request.body;
};
