module.exports = () => (ctx, next) => {
  ctx.sendOk = (response) => {
    ctx.body = {
      ok: true,
      data: response,
    }
  }

  ctx.sendError = (errorMessage) => {
    ctx.body = {
      ok: false,
      message: errorMessage,
    }
  }

  return next()
}
