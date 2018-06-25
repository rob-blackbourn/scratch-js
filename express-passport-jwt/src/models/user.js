import mongoose from 'mongoose'

const Schema = mongoose.Schema

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  permissions: [{ target: String, roles: [String] }]
})

export default mongoose.model('User', UserSchema)
