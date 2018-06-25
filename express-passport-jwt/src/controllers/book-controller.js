class BookController {

  constructor (bookRepository) {
    this.bookRepository = bookRepository
  }

  async create (req, res) {
    try {
      await this.bookRepository.createBook(req.body.isbn, req.body.title, req.body.author, req.body.publisher)
      return res.json({success: true, msg: 'Successful created new book.'})
    } catch (error) {
      return res.json({success: false, msg: 'Save book failed.'})
    }
  }

  async read (req, res, next) {
    try {
      const books = await this.bookRepository.readBooks()
      return res.json(books)
    } catch (error) {
      return next(error)
    }
  }
}

export default BookController
