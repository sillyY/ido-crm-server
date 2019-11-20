import BaseController from './base'
import { errors } from '../config/code'

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
      },
      valiErrors = this.app.validator.validate(createRule, ctx.request.query)

    if (valiErrors && valiErrors.length) {
      this.error(
        errors.VERIFY_PARAMS_ERROR.code,
        errors.VERIFY_PARAMS_ERROR.msg
      )
      return
    }

    const { keyword } = ctx.request.query

    // 设置响应内容和响应状态码
    try {
      const res = await ctx.service.configure.search(keyword)
      this.success(res)
    } catch (err) {
      this.error(
        errors.CRAWLER_CONNECT_ERROR.code,
        errors.CRAWLER_CONNECT_ERROR.msg
      )
    }
  }
  public async install() {
    const { ctx } = this
    // verify params
    const createRule = {
      link: 'string',
      title: 'string',
      desc: 'string',
      author: 'string',
      major: 'string'
    }
    ctx.validate(createRule, ctx.request.body)
    const { link, title, desc, author, major } = ctx.request.body

    // save book
    const [saveBookResult, saveBookErr] = await ctx.helper.errorCaptured(
      ctx.service.book.saveBook,
      {
        title,
        desc,
        author,
        major
      }
    )
    if (saveBookErr) {
      this.error(10001, saveBookErr)
      return
    }

    // get chapters
    const [getChapterResult, getChapterErr] = await ctx.helper.errorCaptured(
      ctx.service.crawler.getChapter,
      link
    )
    if (getChapterErr) {
      this.error(10001, getChapterErr)
      return
    }

    await this._runSchedule(getChapterResult, saveBookResult, ctx)

    this.success('保存成功')
  }
  private async _runSchedule(chapters, ctxData, ctx) {
    const { bookId } = ctxData
    let i = 0,
      len = chapters.length
    for (; i < len; i++) {
      const { title, href } = chapters[i]

      const [getContentResult, getContentErr] = await ctx.helper.errorCaptured(
        ctx.service.crawler.getContent,
        href
      )
      if (getContentErr) {
        this.error(10001, getContentErr)
        return
      }

      const { content } = getContentResult

      // @ts-ignore
      const [
        saveChapterResult,
        saveChapterErr
      ] = await ctx.helper.errorCaptured(ctx.service.book.saveChapter, {
        bookId,
        title,
        words: content.length
      })
      if (saveChapterErr) {
        this.error(10001, saveChapterErr)
        return
      }

      const [
        // @ts-ignore
        saveContentResult,
        saveContentErr
      ] = await ctx.helper.errorCaptured(ctx.service.book.saveContent, content)
      if (saveContentErr) {
        this.error(10001, saveContentErr)
        return
      }
      saveChapterResult && console.log(`${saveChapterResult.title} 获取完成`)
    }
  }
  public async update() {
    const { ctx } = this

    // verify params
    const createRule = {
      title: 'string',
      desc: 'string',
      author: 'string',
      major: 'string'
    }
    ctx.validate(createRule, ctx.request.body)
    const { title, desc, author, major } = ctx.request.body

    // save book
    const [saveBookResult, saveBookErr] = await ctx.helper.errorCaptured(
      ctx.service.book.saveBook,
      {
        title,
        desc,
        author,
        major
      }
    )
    if (saveBookErr) {
      this.error(10001, saveBookErr)
      return
    }
    this.success(saveBookResult)
  }
}
