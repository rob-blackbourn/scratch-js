import passport from 'passport'
import express from 'express'
import Book from '../models/book'

const router = express.Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    var book = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher
    })

    try {
      await book.save()
      res.json({success: true, msg: 'Successful created new book.'})
    } catch (error) {
      return res.json({success: false, msg: 'Save book failed.'})
    }
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const books = await Book.find()
      return res.json(books)
    } catch (error) {
      return next(error)
    }
  }
)

export default router
