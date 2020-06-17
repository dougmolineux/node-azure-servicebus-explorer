const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const {
  addSavedConnection,
  getSavedConnections,
  kill,
  peek,
  removeSavedConnection,
  setEnvToConnection,
} = require('./functions');

const app = new Koa();
const router = new Router();

const routes = { peek: '/peek', env: '/env', kill: '/kill' };

const editConnection = () => console.log('editConnection');

router
  .get(routes.peek, peek)
  .get(routes.env, getSavedConnections)
  .post(routes.env, addSavedConnection)
  .put(routes.env, setEnvToConnection)
  .delete(routes.env, removeSavedConnection)
  .patch(routes.env, editConnection)
  .post(routes.kill, kill);

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

module.exports = app;
