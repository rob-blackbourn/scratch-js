import Book from '../models/book'

export async function create (req, res) {
  var book = new Book({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher
  })

  try {
    await book.save()
    return res.json({success: true, msg: 'Successful created new book.'})
  } catch (error) {
    return res.json({success: false, msg: 'Save book failed.'})
  }
}

export async function read (req, res, next) {
  try {
    // const payload = decodeAuthHeaderBearerToken(req.headers)
    console.log('user', req.user)
    console.log('authInfo', req.authInfo)
    const books = await Book.find()
    return res.json(books)
  } catch (error) {
    return next(error)
  }
}
