// import mongoose from 'mongoose'
import NewsMod from '../models/news'
// import uuid from 'uuid'
class News {
//   constructor() {}
  async new(ctx) {
    // const key = uuid.v4()
    const { title, content, description } = ctx.request.body
    let news
    try {
      news = new NewsMod({
        title: title,
        content: content,
        description: description
      })
      news = await news.save()
    } catch (e) {
      ctx.body = {
        code: 20000,
        error_code: 1,
        message: '保存失败'
      }
    }

    ctx.body = {
      error_code: 0,
      code: 20000,
      message: '保存成功',
      data: {
        _id: news._id,
        title: news.title,
        desc: news.description
      }
    }
  }

  async list(ctx) {
    const count = ctx.request.query.count || 100
    const skipNum = ctx.request.query.skipNum || 0
    const sort = ctx.request.query.sort || -1

    const data = await NewsMod.find({}, ['title', 'description', 'meta', 'label'])
      .populate({ path: 'label', select: 'name color artCount' })
      .sort({ 'meta.updateAt': sort })
      .skip(parseInt(skipNum))
      .limit(parseInt(count))
    ctx.body = {
      code: 20000,
      message: 'success',
      data: data
    }
  }

  async update(ctx) {
    const { content, description, title, _id } = ctx.request.body
    const news = await NewsMod.findOne({ _id: _id })
    if (title && content && description) {
      news.title = title
      news.content = content
      news.description = description
      await news.save()
      ctx.body = {
        code: 20000,
        err_code: 0,
        message: '保存成功'
      }
    } else {
      ctx.body = {
        code: 20000,
        err_code: 1,
        message: '保存失败'
      }
    }
  }

  async delete(ctx) {
    const _id = ctx.request.body._id
    try {
      await NewsMod.findOne({ _id: _id })
      await NewsMod.remove({ _id: _id })
    } catch (e) {
      ctx.body = {
        message: 'failed'
      }
    }
    ctx.body = {
      message: 'success'
    }
  }

  async findOne(ctx) {
    const _id = ctx.request.query._id
    if (_id) {
      const data = await NewsMod.findOne({ _id: _id })
        .populate({ path: 'label', select: 'name color artCount' })
      ctx.body = {
        code: 20000,
        message: 'success',
        data: data
      }
    }
  }
}

export default new News()
