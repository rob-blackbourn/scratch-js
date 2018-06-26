import { ObjectID } from 'mongodb'
import UserSchema from '../schema/user-schema'

class UserStore {

  constructor (db) {
    this.db = db
  }

  async getCollectionAsync () {
    if (!this._collection) {
      this._collection = await this.db.createCollection('users', {
        validator: {
          $jsonSchema: UserSchema
        }
      })
      await this._collection.createIndex({ email: 1 }, { unique: true })
    }

    return this._collection
  }

  get collection () {
    return this.getCollectionAsync()
  }

  async create (user) {
    const collection = await this.collection
    const result = await collection.insertOne(user)
    return result.insertedId ? user : null
  }

  async readByEmail (email) {
    const collection = await this.collection
    const user = await collection.findOne({email: email})
    return user
  }

  async read (id) {
    const collection = await this.collection
    return collection.findOne({_id: ObjectID.createFromHexString(id)})
  }

  async readAll () {
    const collection = await this.collection
    const cursor = await collection.find({})
    return cursor.toArray()
  }

  async update (id, fields) {
    const collection = await this.collection
    const _id = ObjectID.createFromHexString(id)
    const result = await collection.updateOne({ _id }, { $set: fields })
    return result.result
  }

  async delete (id) {
    const collection = await this.collection
    await collection.deleteOne({ _id: ObjectID.createFromHexString(id) })
  }
}

export default UserStore
