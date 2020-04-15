const Koa = require('koa');
const cors = require('@koa/cors');
const topicPeek = require('./topic-peek');

const app = new Koa();

app.use(cors());
app.use(async(ctx) => {
  ctx.body = await topicPeek.peek();
});

app.listen(3000);
