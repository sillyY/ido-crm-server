import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router
    .get('/books', controller.book.getBookPage)
    .post('/books', controller.book.addBook)
    .get('/books/:bookId', controller.book.getBook)
    .get('/books/chapters/:chapterId', controller.book.getChapter)
    .get('/books/content/:bookId/:chapterId', controller.book.getContent)

  router.get('/search', controller.configure.search)
    .get('/update', controller.configure.update)
    .post('/install', controller.configure.install)
}
