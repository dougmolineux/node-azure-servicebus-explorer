const topicPeek = require('../topic-peek');

module.exports = async function peek(ctx) {
  ctx.body = await topicPeek.peek();
};
