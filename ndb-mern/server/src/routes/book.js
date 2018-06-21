import express from 'express'
import Book from '../models/Book.js'
import passport from 'passport'
import passportFactory from '../config/passport'

passportFactory(passport)

const router = express.Router()

function getToken (headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
  } else {
    return null
  }
}

/* GET ALL BOOKS */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  var token = getToken(req.headers)
  if (token) {
    Book.find(function (err, books) {
      if (err) return next(err)
      res.json(books)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'})
  }
})

/* SAVE BOOK */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  var token = getToken(req.headers)
  if (token) {
    Book.create(req.body, function (err, post) {
      if (err) return next(err)
      res.json(post)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
})

export default router
