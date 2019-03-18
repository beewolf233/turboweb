import Router from 'koa-router'
import User from '../database/controllers/user'
import News from '../database/controllers/news'
import { verifyToken } from '../api/user'
export default () => {   
  const router = new Router({ prefix: '/api' })
  // news
  router.post('/news/save', verifyToken, News.new)
  router.get('/news/list', News.list)
  router.post('/news/update', verifyToken, News.update)
  router.post('/news/delete', verifyToken, News.delete)
  router.get('/news/read', News.findOne)
  // router.post('/news/addLabel',verifyToken, News.addLabel)
  // router.post('/news/delLabel',verifyToken, News.delLabel)
  // user
  router.post('/login', User.login)
  router.post('/logout', verifyToken, User.logout)
  return router
}
