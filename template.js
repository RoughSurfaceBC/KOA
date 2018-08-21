const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const { serviceInfo } = require('./util');

const app = new Koa();

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}));

app.use(async (ctx) => {
  const title = 'hello template';
  const content = 'my world!';
  await ctx.render('index', {
    title,
    content
  })
})

app.listen(3000, () => {
  serviceInfo();
})