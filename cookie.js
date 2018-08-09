const Koa = require('koa');
const util = require('./util');

const app = new Koa();

app.use(async (ctx) => {
  if (ctx.url === '/index') {
    ctx.cookies.set('cid', 'hello world', {
      domain: '192.168.31.223',
      path: '/index',
      maxAge: 10 * 60 * 1000,
      expires: new Date('2018-06-04'),
      httpOnly: false,
      overwrite: false
    })
    ctx.body = 'cookie is ok'
  } else {
    ctx.body = 'cookie not set'
  }
});

app.listen(3000, () => {
  util.serviceInfo();
})
