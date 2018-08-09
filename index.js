const Router = require('koa-router');
const Koa = require('koa');
const os = require('os');
const colors = require('colors');

const app = new Koa();
const home = new Router();
const page = new Router();
const router = new Router();

// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener("end",function(){
        let parseData = parseQueryStr( postdata )
        resolve( parseData )
      })
    } catch ( err ) {
      reject(err)
    }
  })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.log( queryStrList )
  for (  let [ index, queryStr ] of queryStrList.entries()  ) {
    let itemList = queryStr.split('=')
    queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
  }
  return queryData
}


home.all('/', async(ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    const html = `
      <ul>
        <li><a href="/page/hello">/page/hello</a></li>
        <li><a href="/page/404">/page/404</a></li>
      </ul>
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html;
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    const params = await parsePostData(ctx);
    ctx.body = params;
  } else {
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>';
  }

});

page.get('/404', async(ctx) => {
  ctx.body = '404 page!';
}).get('/hello', async(ctx) => {
  ctx.body = 'hello';
});

router.use('/', home.routes(), home.allowedMethods())
.use('/page', page.routes(), page.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());


app.listen(3000, () => {
  console.log(colors.rainbow('Service link:'));
  console.log(colors.green(`${os.networkInterfaces()[Object.keys(os.networkInterfaces())[0]][1].address}:3000`));
})