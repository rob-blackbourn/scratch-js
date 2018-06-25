import User from '../models/user'

class UserRepository {

  saveUser (username, password) {
    const user = new User({
      username: username,
      password: password
    })
    return user.save()
  }

  getUserByUsername (username) {
    return User.findOne({username: username})
  }
  
}

export default UserRepository
