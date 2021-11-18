const Koa = require('koa');
const Router = require('./router');
const middleware = require('./src/middleware');
const statics = require('koa-static');
const app = new Koa();
middleware(app);
Router(app);


app.use(statics('.'))
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});

