const { respondSucceeded } = require('./env/writeConnectionToFile');

const kill = async (ctx) => {
  setTimeout(process.exit);
  ctx.body = respondSucceeded();
};

module.exports = kill;
