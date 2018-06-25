class UserCache {

  constructor () {
    this.users = {}
  }

  get (id) {
    return this.users[id]
  }

  set (id, user) {
    this.users[id] = user
  }
  
}

export default UserCache
