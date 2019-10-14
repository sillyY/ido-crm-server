const { Controller } = require('egg')
export default class BaseController extends Controller {
  get user() {
    return this.ctx.session.user
  }

  success(data) {
    this.ctx.body = {
      code: 10000,
      success: true,
      data,
      error: ''
    }
  }

  error(code, msg) {
    this.ctx.body = {
      code,
      success: false,
      data: {},
      error: msg
    }
  }

  notFound(msg) {
    msg = msg || 'not found'
    this.ctx.throw(404, msg)
  }
}

