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
    return new Promise(async (resolve, reject) => {
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

      // Whether the book has been saved
      await Book.findOne({ title, author }, function(err, docs) {
        if (err) {
          reject(err)
        }
        if (docs) {
          resolve(docs)
        } else {
          book.save(function(err, product) {
            if (err) {
              reject(err)
            }
            resolve(product)
          })
        }
      })
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

      ContentSchema.plugin(db.autoIncrement.plugin, {
        model: 'Content',
        field: 'contentId',
        startAt: 10000
      })
      const Chapter = mongoose.model('Chapter', ChpaterSchema),
        Content = mongoose.model('Content', ContentSchema)

      // @ts-ignore
      Content.nextCount((err, count) => {
        if (err) reject(err)
        var chapter = new Chapter({
          title,
          bookId,
          words,
          contentId: count
        })
        // Whether the chapter has been saved
        Chapter.findOne({ title, bookId }, function(err, docs) {
          if (err) reject(err)
          if (docs) {
            console.log('章节已存在')
            resolve(docs)
          } else {
            chapter.save(function(err, product) {
              if (err) {
                reject(err)
              }
              resolve(product)
            })
          }
        })
      })
    })
  }

  async saveContent(content) {
    return new Promise((resolve, reject) => {
      ContentSchema.plugin(db.autoIncrement.plugin, {
        model: 'Content',
        field: 'contentId',
        startAt: 10000
      })
      const Content = mongoose.model('Content', ContentSchema)

      var c = new Content({
        content
      })

      Content.findOne({ content }, (err, docs) => {
        if (err) reject(err)
        if (docs) {
          console.log('内容已存在')
          resolve(docs)
        } else {
          c.save(function(err, product) {
            if (err) {
              reject(err)
            }
            resolve(product)
          })
        }
      })
    })
  }
}
