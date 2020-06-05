const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { peek, setEnv: setConnection, kill } = require('./functions');

const app = new Koa();
const router = new Router();

const routes = { peek: '/peek', env: '/env', kill: '/kill' };

const getConnections = () => console.log('getConnections');
const addConnection = () => console.log('addConnection');
const removeConnection = () => console.log('removeConnection');
const editConnection = () => console.log('editConnection');

router
  .get(routes.peek, peek)
  .get(routes.env, getConnections)
  .post(routes.env, addConnection)
  .put(routes.env, setConnection)
  .delete(routes.env, removeConnection)
  .patch(routes.env, editConnection)
  .post(routes.kill, kill);

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

module.exports = app;
