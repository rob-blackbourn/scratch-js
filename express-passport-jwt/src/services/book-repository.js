import Book from '../models/book'

class BookRepository {

  createBook (isbn, title, author, publisher) {
    var book = new Book({
      isbn: isbn,
      title: title,
      author: author,
      publisher: publisher
    })
  
    return book.save()
  }
  
  readBooks () {
    return Book.find()
  }
  
}

export default BookRepository
