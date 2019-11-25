const fetch = require('node-fetch')

module.exports = {
  fetch: async (ctx, next) => {
    let hitokotoResponse = null
    const hitokotoSource = ['https://v1.hitokoto.cn/', 'https://international.v1.hitokoto.cn/']

    for (let i = 0; i < hitokotoSource.length; i++) {
      hitokotoResponse = await fetch(`${ hitokotoSource[i] }${ ctx.request.search }`)

      if (hitokotoResponse.ok) {
        ctx.sendOk(await hitokotoResponse.json())

        return next()
      }
    }

    ctx.logger.error('一言服务异常')
    ctx.sendError('一言服务暂不可用，请稍后重试！')

    return next()
  },
}
