class BookService {

  constructor (bookStore) {
    this.bookStore = bookStore
  }

  create (isbn, title, author, publisher) {
    var book = {
      isbn: isbn,
      title: title,
      author: author,
      publisher: publisher
    }

    return this.bookStore.create(book)
  }
  
  readAll () {
    return this.bookStore.readAll()
  }
  
  read (id) {
    return this.bookStore.read(id)
  }
  
  readByIsbn (isbn) {
    return this.bookStore.readByIsbn(isbn)
  }
  
  update (id, fields) {
    return this.bookStore.update(id, fields)
  }

  delete (id) {
    this.bookStore.delete(id)
  }

}

export default BookService
