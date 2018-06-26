import StoreMock from './store.mock'
import { find } from '../utilities/iterables'

class UserStoreMock extends StoreMock {

  async readByEmail (email) {
    return new Promise((resolve, reject) => {
      const user = find(this.store.values(), (value) => value.email === email)
      return resolve(user)
    })
  }
  
}

export default UserStoreMock
