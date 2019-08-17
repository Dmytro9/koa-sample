// Subdomains 
app.subdomainOffset


// Context
app.context.db = db();
ctx.db


// Delegation
ctx.responds.length - ctx.length
ctx.responds.type - ctx.type


ctx.requst.path - ctx.path


// Namespace - ctx.state - for passing data to frontend client !!
ctx.state.user = await User.find(id);


// Application instance reference
ctx.app


// Event emmiter
ctx.app.emit


// Cookie
ctx.cookies.get(name, [options])
ctx.cookies.set(name, value, [options])


// Throw error - works with app.use(async ctx => ...)
ctx.throw(401, 'access_denied', { user: user });


// Creating middleware - naming middleware with wraping function (even without params) for customization
function logger(format) {
    format = format || ':method ":url"';
  
    return async function (ctx, next) {
      const str = format
        .replace(':method', ctx.method)
        .replace(':url', ctx.url);
  
      console.log(str);
  
      await next();
    };
  }
  
  app.use(logger());
  app.use(logger(':method :url'));
