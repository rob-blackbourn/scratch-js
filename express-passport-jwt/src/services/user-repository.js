import User from '../models/user'
import bcrypt from 'bcrypt'

class UserRepository {

  async saveUser (username, password) {
    const user = new User({
      username: username,
      password: await bcrypt.hash(password, 10)
    })
    await user.save()
  }

  getUserByUsername (username) {
    return User.findOne({username: username})
  }
  
  comparePassword (plainTextPassword, hashedPassword) {
    return bcrypt.compare(plainTextPassword, hashedPassword)
  }
  
}

export default UserRepository
