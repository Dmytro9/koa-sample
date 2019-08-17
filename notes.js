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