import { ObjectID } from 'mongodb'
import bcrypt from 'bcrypt'
import UserSchema from '../schema/user-schema'

class UserRepository {

  constructor (db, userCache, config) {
    this.db = db
    this.userCache = userCache
    this.saltOrRounds = config.saltOrRounds
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

  async create (email, password, permissions) {
    const user = {
      email: email,
      password: await this.encryptPasswordAsync(password),
      permissions
    }

    const collection = await this.collection
    const result = await collection.insertOne(user)
    if (!result.insertedId) {
      return null
    }

    this.userCache.set(result.insertedId.toHexString(), user)
    return user
  }

  async readByEmail (email) {
    const collection = await this.collection
    const user = await collection.findOne({email: email})
    if (user) {
      this.userCache.set(user._id.toHexString(), user)
    }
    return user
  }

  async read (id) {
    let user = this.userCache.get(id)
    if (user) {
      return user
    }

    const collection = await this.collection
    user = await collection.findOne({_id: ObjectID.createFromHexString(id)})
    if (user) {
      this.userCache.set(user._id.toHexString(), user)
    }
    return user
  }

  async readAll () {
    const collection = await this.collection
    const cursor = await collection.find({})
    const users = await cursor.toArray()
    return users
  }

  async update (id, fields) {
    const collection = await this.collection
    const result = await collection.updateOne({ _id: ObjectID.createFromHexString(id) }, { $set: fields })
    return result.result
  }

  async delete (id) {
    const collection = await this.collection
    await collection.deleteOne({ _id: ObjectID.createFromHexString(id) })
  }

  encryptPasswordAsync (password) {
    return bcrypt.hash(password, this.saltOrRounds)
  }
  
  comparePassword (plainTextPassword, hashedPassword) {
    return bcrypt.compare(plainTextPassword, hashedPassword)
  }
}

export default UserRepository
