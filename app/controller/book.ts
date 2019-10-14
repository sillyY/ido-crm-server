import BaseController from './base'

export default class BookController extends BaseController {
  public async getBook() {
    const { ctx } = this

    // 校验参数
    const createRule = {
      bookId: 'id'
    }
    ctx.validate(createRule, ctx.params)

    // 设置响应内容和响应状态码
    ctx.body = { id: 101 }
    ctx.status = 201
  }
  public async addBook() {
    const { ctx } = this
    // 校验参数
    const createRule = {
      bookname: 'string'
    }
    ctx.validate(createRule, ctx.request.body)
    ctx.body = await ctx.service.test.sayHi('addBook')
  }
  public async getBookPage() {
    const { ctx } = this
    // 校验参数
    const createRule = {
      pageSize: {
        type: 'number',
        convertType: val => Number(val)
      },
      currentPage: {
        type: 'number',
        convertType: val => Number(val)
      },
      majorId: {
        type: 'string',
        required: false
      },
      bookName: {
        type: 'string',
        required: false
      }
    }
    ctx.validate(createRule, ctx.request.query)
    this.success({
      bookId: 1,
      bookName: '帝霸'
    })
  }

  public async getChapter() {
    const { ctx } = this

    // 校验参数
    const createRule = {
      chapterId: 'id'
    }
    ctx.validate(createRule, ctx.params)

    // 设置响应内容和响应状态码
    ctx.body = { id: 101 }
    ctx.status = 201
  }

  public async getContent() {
    const { ctx } = this

    // 校验参数
    const createRule = {
      bookId: 'id',
      chapterId: 'id'
    }
    ctx.validate(createRule, ctx.params)

    // 设置响应内容和响应状态码
    ctx.body = { id: 101 }
    ctx.status = 201
  }
}
