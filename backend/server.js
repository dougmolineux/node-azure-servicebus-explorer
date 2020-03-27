const Koa = require('koa');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors());
app.use(ctx => {
  ctx.body = [
    {name: 'example topic 1'},
    {name: 'example topic 2'},
    {name: 'example topic 3'},
    {name: 'example topic 4'},
  ];
});

app.listen(3000);
