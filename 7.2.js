const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const convert = require('koa-convert');
const static = require('koa-static');
const { serviceInfo, uploadFile } = require('./util');

const app = new Koa();

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs',
}))

const staticPath = './src';

app.use(convert(static(path.join(__dirname, staticPath))))

app.use(async (ctx) => {
  if (ctx.method === 'GET') {
    let title = 'upload pic async';
    await ctx.render('upload', {title})
  } else if (ctx.url === '/api/picture/upload.json' && ctx.method === 'POST') {
    let result = {
      success: false
    }
    const serverFilePath = path.join(__dirname, './src/img');
    result = await uploadFile( ctx, {
      fileType: 'album',
      path: serverFilePath
    })
    ctx.body = result
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})

app.listen(3000, () => {
  serviceInfo()
})