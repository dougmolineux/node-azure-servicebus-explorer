const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs').promises;

const topicPeek = require('./topic-peek');

const app = new Koa();
const router = new Router();

router.get('/peek', peek).post('/set-env', setEnv).post('/kill', kill);

async function peek(ctx) {
  ctx.body = await topicPeek.peek();
}

async function setEnv(ctx) {
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
}

async function kill(ctx) {
  setTimeout(process.exit);
  ctx.body = { status: 200 };
}

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

module.exports = app;
