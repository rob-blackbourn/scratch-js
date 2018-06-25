import BookSchema from '../schema/book-schema'

class BookRepository {

  constructor (db) {
    this.db = db
  }

  async getCollectionAsync () {
    if (!this._collection) {
      this._collection = await this.db.createCollection('books', {
        validator: {
          $jsonSchema: BookSchema
        }
      })
      await this._collection.createIndex({ isbn: 1 }, { unique: true })
    }

    return this._collection
  }

  get collection () {
    return this.getCollectionAsync()
  }

  async createBook (isbn, title, author, publisher) {
    var book = {
      isbn: isbn,
      title: title,
      author: author,
      publisher: publisher
    }
  
    const collection = await this.collection
    const result = await collection.insertOne(book)
    return result.insertedId
  }
  
  async readBooks () {
    const collection = await this.collection
    const cursor = collection.find({})
    const books = await cursor.toArray()
    return books
  }
  
}

export default BookRepository
