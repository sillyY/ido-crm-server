// app/service/user.js
const Service = require('egg').Service
import * as mongoose from 'mongoose'
import db from '../utils/database'

const Schema = mongoose.Schema

mongoose.set('useFindAndModify', false)

export interface ISaveParams {
  title: String
  desc?: String
  author: String
  major: String
}

const BookSchema = new Schema(
  {
    title: String,
    desc: String,
    author: String,
    major: String
  },
  { versionKey: false }
)
const ChpaterSchema = new Schema(
  {
    title: String,
    bookId: Number,
    contentId: Number,
    words: Number
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'create_time',
      updatedAt: 'update_time'
    }
  }
)
const ContentSchema = new Schema(
  {
    content: String
  },
  {
    versionKey: false
  }
)
export default class BookService extends Service {
  async saveBook(data: ISaveParams) {
    const { title, desc, author, major } = data
    BookSchema.plugin(db.autoIncrement.plugin, {
      model: 'Book',
      field: 'bookId',
      startAt: 10000
    })
    const Book = mongoose.model('Book', BookSchema)
    var book = new Book({
      title,
      desc,
      author,
      major
    })
    book.save(function(err) {
      if (err) {
        throw new Error(err)
      }
      return `${title}存储完成`
    })
  }

  saveChapter(data) {
    return new Promise(async (resolve, reject) => {
      const { title, bookId, words } = data
      ChpaterSchema.plugin(db.autoIncrement.plugin, {
        model: 'Chapters',
        field: 'chapterId',
        startAt: 10000
      })
      const Chapter = mongoose.model('Chapter', ChpaterSchema)

      // get contentId
      const IdentityCounter = mongoose.model('IdentityCounter')
      IdentityCounter.findOne(
        { model: 'Content', field: 'contentId' },
        async function(err, docs: any) {
          if (err) {
            reject(err)
          }
          let contentId = docs.counter ? docs.counter : 10000

          var chapter = new Chapter({
            title,
            bookId,
            words,
            contentId
          })
          // Whether the chapter has been saved
          let isSaved = true
          await Chapter.findOne({ title: title, bookId: bookId }, function(
            err
          ) {
            if (err) {
              reject(err)
            }
            isSaved = false
          })
          if (isSaved) resolve('章节已存在')
          chapter.save(function(err) {
            if (err) {
              reject(err)
            }
            resolve('章节内容保存成功')
          })
        }
      )
    })
  }

  async saveContent(data) {
    const { content } = data
    ContentSchema.plugin(db.autoIncrement.plugin, {
      model: 'Content',
      field: 'contentId',
      startAt: 10000
    })
    const Content = mongoose.model('Content', ContentSchema)

    var c = new Content({
      content
    })
    c.save(function(err) {
      if (err) {
        throw new Error(err)
      }
      return '章节内容保存成功'
    })
  }
}
