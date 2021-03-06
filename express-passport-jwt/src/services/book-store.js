import { ObjectID } from 'mongodb'
import BookSchema from '../schema/book-schema'

class BookStore {

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

  async create (book) {
    const collection = await this.collection
    const result = await collection.insertOne(book)
    return result.insertedId
  }
  
  async readAll () {
    const collection = await this.collection
    const cursor = collection.find({})
    const books = await cursor.toArray()
    return books
  }
  
  async read (id) {
    const collection = await this.collection
    const cursor = collection.findOne({ _id: ObjectID.createFromHexString(id) })
    const books = await cursor.toArray()
    return books
  }
  
  async readByIsbn (isbn) {
    const collection = await this.collection
    const cursor = collection.findOne({ isbn: isbn })
    const books = await cursor.toArray()
    return books
  }
  
  async update (id, fields) {
    const collection = await this.collection
    const result = await collection.replaceOne({ _id: ObjectID.createFromHexString(id) }, { $set: fields })
    return result.result
  }

  async delete (id) {
    const collection = await this.collection
    await collection.deleteOne({ _id: ObjectID.createFromHexString(id) })
  }

}

export default BookStore
