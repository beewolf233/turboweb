
import UserMod from '../models/user'
class User {
  //   constructor() {}
  async login(ctx) {
    const { username, password } = ctx.request.body
    const user = await UserMod.findOne({ username: username })
    let match = false
    if (user) match = await user.comparePassword(password, user.password)
    if (match) {
      ctx.session.user = {
        username: user.username,
        _id: user._id
      }
      const token = user.getToken()
      user.token = token
      await user.save()

      return (ctx.body = {
        code: 20000,
        success: true,
        data: {
          username: user.username,
          token: token
        }
      })
    }
    return (ctx.body = {
      err_code: 1,
      message: '密码错误'
    })
  }
  async logout(ctx) {
    ctx.body = {
      err_code: 0,
      message: '登出'
    }
  }  
}
export default new User()
