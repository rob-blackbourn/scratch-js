class BookController {

  constructor (bookService) {
    this.bookService = bookService
  }

  async create (req, res) {
    try {
      await this.bookService.create(req.body.isbn, req.body.title, req.body.author, req.body.publisher)
      return res.json({success: true, msg: 'Successful created new book.'})
    } catch (error) {
      return res.json({success: false, msg: 'Save book failed.'})
    }
  }

  async read (req, res, next) {
    try {
      const books = await this.bookService.readAll()
      return res.json(books)
    } catch (error) {
      return next(error)
    }
  }
}

export default BookController
