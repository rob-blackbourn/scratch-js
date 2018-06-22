import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', async function (next) {

  if (!(this.isModified('password') || this.isNew)) {
    return next()
  }

  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

export default mongoose.model('User', UserSchema)
