const Router = require('koa-router');
const homeController = require('./src/controller/Info');
const multiparty = require('koa2-multiparty');
const router = Router();
module.exports = (app) => {
    router.get('/getall', homeController.getall);
    router.post('/addinfo', multiparty(), homeController.addinfo);
    router.post('/login', homeController.login);
    router.post('/sign', homeController.sign);
    app.use(router.routes()).use(router.allowedMethods());
};