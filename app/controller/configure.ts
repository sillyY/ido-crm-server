import BaseController from './base'

export default class ConfigureController extends BaseController {

  public async search() {
    const { ctx } = this

    // 校验参数
    const createRule = {
      bookName: 'string'
    }
    ctx.validate(createRule, ctx.request.query)

    // 设置响应内容和响应状态码
    // this.success({ bookId: 1, bookName: '帝霸' })
    ctx.body = { id: 101 }
    ctx.status = 201
  }
  public async update() {
    const { ctx } = this

    // 校验参数
    // const createRule = {
    //   bookName: 'string'
    // }
    // ctx.validate(createRule, ctx.request.query)

    // 设置响应内容和响应状态码
    // this.success({ bookId: 1, bookName: '帝霸' })
    ctx.body = { id: 102 }
    ctx.status = 201
  }
}
