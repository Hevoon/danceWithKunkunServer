const {sign} = require('jsonwebtoken');
const secret = 'hevoon';
const fs = require('fs')
const path = require('path')
const userModel = require('../data/model/login');
module.exports = {
    getall: async (ctx, next) => {
        let paths = path.join(__dirname, 'public/')
        let files = fs.readdirSync(paths)
        let js_files = files.filter((f) => {
            return f.endsWith('.jpg') || f.endsWith('.png')
        });
        let list = []
        js_files.map(function (e) {
            let a = `http://localhost:3000/src/controller/public/${e}`
            list.push(a)
        })
        ctx.response.body = list
        ctx.response.status = 200;
        ctx.response.state = 200;
        ctx.response.message = 'success';

    },
    addinfo: async (ctx, next) => {
        const files = ctx.req.files.upload; // 获取上传文件
        try {
            const reader = fs.createReadStream(files.path);
            // 获取上传文件扩展名
            let reg = RegExp(/.jpg|.png/)
            // console.log(`${ctx.req.body.title}${files.name.match(reg)}`)
            let filePath = path.join(__dirname, 'public/') + `/${ctx.req.body.title}${files.name.match(reg)}`;
            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);
            // }
        } catch (e) {
            console.log(e)
        }
        ctx.response.state = 200;
        ctx.response.status = 200;
        ctx.response.message = 'ok';
    },
    login: async (ctx, next) => {
        const user = ctx.request.body;
        let {username, password} = user;
        if (user && username && password) {
            await userModel.findAll({
                where: {
                    username: username,
                    password: password
                }
            }).then(
                function (e) {
                    console.log(e[0])
                    if (e[0]) {
                        const token = sign({username}, secret, {expiresIn: '1h'});
                        ctx.response.body = {
                            message: 'GET Token Success',
                            state: 200,
                            status: 200,
                            code: 1,
                            token
                        };
                    } else {
                        ctx.response.body = {
                            message: 'Param Error',
                            code: -1,
                            state: 200,
                            status: 200
                        }
                    }
                }).catch((e) => {
                ctx.response.body = {
                    message: 'Param Error',
                    code: -1,
                    state: 200,
                    status: 200
                }
            })
        } else {
            ctx.response.body = {
                message: 'Param Error',
                code: -1
            }
        }
    },
    sign: async (ctx, next) => {
        const user = ctx.request.body;
        let {username, password} = user;
        if (user && username && password) {
            await userModel.create({
                username: username,
                password: password
            }).then(
                function (e) {
                    const token = sign({username}, secret, {expiresIn: '1h'});
                    ctx.response.body = {
                        message: 'GET Token Success',
                        code: 1,
                        token
                    };
                }).catch((e) => {
                console.log(e)
            })
        } else {
            ctx.response.body = {
                message: 'Param Error',
                code: -1
            }
        }
    }
};