const kill = async (ctx) => {
  setTimeout(process.exit);
  ctx.body = { status: 200 };
};

module.exports = kill;
