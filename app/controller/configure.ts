import BaseController from './base'

export interface InstallParams {
  link: String
  author: String
  bookImg: String
  title: String
  major: String
}

export default class ConfigureController extends BaseController {
  public async search() {
    const { ctx } = this

    // 校验参数
    const createRule = {
      keyword: 'string'
    }
    ctx.validate(createRule, ctx.request.query)

    const { keyword } = ctx.request.query

    const [res, err] = await ctx.helper.errorCaptured(
      ctx.service.configure.search,
      keyword
    )
    if (err) {
      this.error(10001, err)
      return
    }
    this.success(res)
  }
  public async install() {
    const { ctx } = this

    // 校验参数
    // const createRule = {
    //   link: 'string',
    //   title: 'string',
    //   desc: 'string',
    //   author: 'string',
    //   major: 'string'
    // }
    // ctx.validate(createRule, ctx.request.body)
    // const { link, title, desc, author, major } = ctx.request.body

    // console.log(link)

    // const [res, err] = await ctx.helper.errorCaptured(
    //   ctx.service.book.saveBook,
    //   {
    //     title,
    //     desc,
    //     author,
    //     major
    //   }
    // )

    // 设置章节
    const createRule = {
      title: 'string',
      words: {
        type: 'number',
        convertType: val => Number(val)
      },
      bookId: 'id'
    }
    ctx.validate(createRule, ctx.request.body)
    const { title, words, bookId } = ctx.request.body

    const [res, err] = await ctx.helper.errorCaptured(
      ctx.service.book.saveChapter,
      {
        title,
        words,
        bookId
      }
    )

    if (err) {
      this.error(10001, err)
      return
    }
    this.success(res)

    // 设置正文
    // const createRule = {
    //   content: 'string'
    // }
    // ctx.validate(createRule, ctx.request.body)
    // const { content } = ctx.request.body

    // const [res, err] = await ctx.helper.errorCaptured(
    //   ctx.service.book.saveContent,
    //   {
    //     content
    //   }
    // )

    // if(err) {
    //   this.error(10001, err)
    //   return
    // }
    // this.success(res)

    // const [res, err] = await ctx.helper.errorCaptured(
    //   ctx.service.crawler.getChapter,
    //   link
    // )
    // if (err) {
    //   this.error(10001, err)
    //   return
    // }

    // for (let v of res) {
    //   // @ts-ignore
    //   const [res, err] = await ctx.helper.errorCaptured(
    //     ctx.service.crawler.getContent,
    //     v.href
    //   )
    // }
    // this.success(res.data)
  }
  public async update() {
    const { ctx } = this

    // 校验参数
    // const createRule = {
    //   keyword: 'string'
    // }
    // ctx.validate(createRule, ctx.request.query)

    // 设置响应内容和响应状态码
    // this.success({ bookId: 1, keyword: '帝霸' })
    ctx.body = { id: 102 }
    ctx.status = 201
  }
}
