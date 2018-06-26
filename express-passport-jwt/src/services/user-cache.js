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
  
  delete (id) {
    return delete this.users[id]
  }
}

export default UserCache
