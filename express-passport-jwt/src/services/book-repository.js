import Book from '../models/book'

export function createBook (isbn, title, author, publisher) {
  var book = new Book({
    isbn: isbn,
    title: title,
    author: author,
    publisher: publisher
  })

  return book.save()
}

export async function readBooks () {
  return Book.find()
}
