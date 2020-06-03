const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { peek, setEnv, kill } = require('./functions');

const app = new Koa();
const router = new Router();

router.get('/peek', peek).post('/set-env', setEnv).post('/kill', kill);

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

module.exports = app;
