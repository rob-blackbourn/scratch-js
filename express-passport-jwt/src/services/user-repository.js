import User from '../models/user'
import bcrypt from 'bcrypt'

class UserRepository {

  async saveUser (email, password, permissions) {
    const user = new User({
      email: email,
      password: await bcrypt.hash(password, 10),
      permissions
    })
    await user.save()
  }

  getUserByEmail (email) {
    return User.findOne({email: email})
  }

  getById (id) {
    return User.findOne({_id: id})
  }
  
  comparePassword (plainTextPassword, hashedPassword) {
    return bcrypt.compare(plainTextPassword, hashedPassword)
  }
  
}

export default UserRepository
