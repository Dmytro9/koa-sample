const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');

const app = new Koa();
const router = new KoaRouter();

// Middleware
app.use(json());


app.context.something = 'something';


// app.use(async (ctx, next) => {
// // console.log(ctx)
// console.log('middleware')
// next()
// });


function auth1(ctx, next) {
  // console.log(ctx)
  console.log('I am middleware1...!')
  next()
}

function auth2(ctx, next) {
  console.log('I am middleware2...!')
  console.log(ctx.something)
  next()
}

// Router middleware
app.use(router.routes()).use(router.allowedMethods());

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

router.get('/test1', auth1, auth2, ctx => ctx.body = 'Hello Test')


router.get('/test2', auth2, test2);

// Routes methods
async function test2(ctx) {
  await console.log('index')
  ctx.body = 'Hello from test2'
}

async function test3(ctx) {
  await console.log('test 3 with params')
  ctx.body = `${ctx.params.id}`
}


router.get('/test3/:id', auth1, test3);

app.listen(4000, () => console.log('Listening on 4000'));