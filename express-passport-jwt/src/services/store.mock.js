import { ObjectID } from 'mongodb'
import { some } from '../utilities/iterables'

class StoreMock {

  constructor () {
    this.store = new Map()
  }

  async create (item) {
    return new Promise((resolve, reject) => {
      if ((item._id && this.store.has(item._id)) || some(this.store.entries(), ([key, value]) => key === 'email' && value === item)) {
        reject(new Error('record exists'))
      }
      item._id = new ObjectID()
      const id = item._id.toString()
      this.store.set(id, item)
      resolve(item)
    })
  }

  async read (id) {
    return new Promise((resolve, reject) => resolve(this.store.get(id)))
  }

  async readAll () {
    return new Promise((resolve, reject) => resolve(Array.from(this.store.values())))
  }

  async update (id, fields) {
    return new Promise((resolve, reject) => {
      const item = this.store.get(id)
      if (item) {
        for (const key in fields) {
          item[key] = fields[key]
        }
        resolve(item)
      } else {
        reject(new Error('key not found'))
      }
    })
  }

  async delete (id) {
    return new Promise((resolve, reject) => {
      if (this.store.delete(id)) {
        resolve()
      } else {
        reject(new Error('key not found'))
      }
    })
  }
}

export default StoreMock
