import { createBook, readBooks } from '../services/book-repository'

export async function create (req, res) {
  try {
    await createBook(req.body.isbn, req.body.title, req.body.author, req.body.publisher)
    return res.json({success: true, msg: 'Successful created new book.'})
  } catch (error) {
    return res.json({success: false, msg: 'Save book failed.'})
  }
}

export async function read (req, res, next) {
  try {
    const books = await readBooks()
    return res.json(books)
  } catch (error) {
    return next(error)
  }
}
