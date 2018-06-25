import User from '../models/user'

export async function saveUser (username, password) {
  const user = new User({
    username: username,
    password: password
  })
  return user.save()
}

export function getUserByUsername (username) {
  return User.findOne({username: username})
}
