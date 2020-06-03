module.exports = async function kill(ctx) {
  setTimeout(process.exit);
  ctx.body = { status: 200 };
};
