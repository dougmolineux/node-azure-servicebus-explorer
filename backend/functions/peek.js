const topicPeek = require('../topic-peek');

const peek = async (ctx) => {
  ctx.body = await topicPeek.peek();
};

module.exports = peek;
