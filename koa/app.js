const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');

const app = new Koa();
const router = new KoaRouter();

// Middleware
app.use(json());

app.use(async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    // some errors will have .status
    // however this is not a guarantee
    ctx.status = err.status || 500;
    ctx.body = err.message

    // since we handled this manually we'll
    // want to delegate to the regular app
    // level error handling as well so that
    // centralized still functions correctly.
    ctx.app.emit('error', err, ctx);
  }
});


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

router.get('/test1', auth1, auth2, ctx => {
  console.log('fresh ', ctx.stale)
  if (ctx.stale) {
    ctx.status = 304;
    return;
  }
  console.log(Date.now())
  ctx.set('Last-Modified', Date.now());
  ctx.body = 'Hello Test'
})


router.get('/test2', auth2, test2);

// Routes methods
async function test2(ctx, next) {
  try {
    ctx.throw()
  } catch (e) {
    ctx.status = 404;
    ctx.body =  {message: 'Not found'};
  }

  // await next();
}



app.on('error', function(err) {
  if (process.env.NODE_ENV != 'test') {
    console.log('sent error %s to the cloud', err.message);
    console.log(err);
  }
});


async function test3(ctx) {
  console.log(ctx.origin)

  ctx.set({
    'Etag': '321',
    'Last-Modified': new Date()
  });

  ctx.body = {
    params: ctx.params.id,
    header: ctx.header,
    originalUrl: ctx.originalUrl,
    fresh: ctx.fresh,
    protocol: ctx.protocol,
    hostname: ctx.hostname,
    lastModified: ctx.lastModified,
    length: ctx.length
  }
  
}


router.get('/test3/:id', auth1, test3);

app.listen(4000, () => console.log('Listening on 4000'));