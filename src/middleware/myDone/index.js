const compose = require('koa-compose');
const resTime = require('./resTime')();


async function midd2(ctx, next) {
    console.log('let us begin');
    await next();
    console.log(ctx.path);
}


const all = compose([resTime, midd2]);

module.exports = () => {
    return all
};