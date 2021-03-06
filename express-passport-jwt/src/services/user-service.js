import bcrypt from 'bcrypt'

class UserService {

  constructor (userStore, userCache, config) {
    this.userStore = userStore
    this.userCache = userCache
    this.saltOrRounds = config.saltOrRounds
  }

  async create (email, password, permissions) {
    let user = {
      email: email,
      password: await this.encryptPasswordAsync(password),
      permissions
    }

    user = await this.userStore.create(user)
    if (user) {
      this.userCache.set(user._id.toString(), user)
    }

    return user
  }

  async readByEmail (email) {
    const user = await this.userStore.readByEmail(email)
    if (user) {
      this.userCache.set(user._id.toString(), user)
    }
    return user
  }

  async read (id) {
    let user = this.userCache.get(id)
    if (user) {
      return user
    }

    user = await this.userStore.read(id)
    if (user) {
      this.userCache.set(user._id.toString(), user)
    }

    return user
  }

  async readAll () {
    return this.userStore.readAll()
  }

  async update (id, fields) {
    if (fields.password) {
      fields.password = await this.encryptPasswordAsync(fields.password)
    }
    await this.userStore.update(id, fields)
    this.userCache.delete(id)
  }

  async delete (id) {
    await this.userStore.delete(id)
    this.userCache.delete(id)
  }

  encryptPasswordAsync (password) {
    return bcrypt.hash(password, this.saltOrRounds)
  }
  
  comparePassword (plainTextPassword, hashedPassword) {
    return bcrypt.compare(plainTextPassword, hashedPassword)
  }
}

export default UserService
