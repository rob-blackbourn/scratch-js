import StoreMock from './store.mock'
import { find } from '../utilities/iterables'

class BookStoreMock extends StoreMock {

  async readByIsbn (isbn) {
    return new Promise((resolve, reject) => {
      const book = find(this.store.values(), (value) => value.isbn === isbn)
      return resolve(book)
    })
  }
  
}

export default BookStoreMock
