import Koa from 'koa'
import Router from './router/routes.js'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import Database from './middlewares/database'
import addSession from './middlewares/session'
Database()
const app = new Koa()
const router = Router()
addSession(app)
// 静态资源目录对于相对入口文件app.js的路径
// const staticPath = '../dist'
app.use(logger())
app.use(bodyParser())
/** 这是处理前端跨域的配置*/
app.use(cors({
  origin: function(ctx) {     
    // if (ctx.url === '/login') {
    //   return '*' // 允许来自所有域名请求
    // }
    return '*' // 允许来自所有域名请求
    // return 'http://localhost:8080'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Token']
}))
// const main = ctx => {
//     ctx.response.body = 'Hello World'
// }
// app.use(main)
// const login= ctx => {
//     ctx.body = {  //这是向前台返回的数据 因为没有连接数据库所以我们自己定义，后面讲连接数据库
//         user:'111',
//         code:1,
//         status:200
//     }
// }
// app.router.use('/login',login)
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
console.log('starting at port 3000')