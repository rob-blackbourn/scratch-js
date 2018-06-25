import User from '../models/user'
import bcrypt from 'bcrypt'

class UserRepository {

  async saveUser (email, password) {
    const user = new User({
      email: email,
      password: await bcrypt.hash(password, 10)
    })
    await user.save()
  }

  getUserByEmail (email) {
    return User.findOne({email: email})
  }
  
  comparePassword (plainTextPassword, hashedPassword) {
    return bcrypt.compare(plainTextPassword, hashedPassword)
  }
  
}

export default UserRepository
