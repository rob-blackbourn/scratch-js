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

  encryptPasswordAsync (password) {
    return bcrypt.hash(password, this.saltOrRounds)
  }

  async saveUser (email, password, permissions) {
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

  async getUserByEmail (email) {
    const collection = await this.collection
    const user = await collection.findOne({email: email})
    if (user) {
      this.userCache.set(user._id.toHexString(), user)
    }
    return user
  }

  async getById (id) {
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
  
  comparePassword (plainTextPassword, hashedPassword) {
    return bcrypt.compare(plainTextPassword, hashedPassword)
  }
}

export default UserRepository
