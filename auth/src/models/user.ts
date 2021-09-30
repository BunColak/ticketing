import { model, Schema } from 'mongoose'
import UniqueKeyError from '../errors/UniqueKeyError'
import type { IUser } from '../types'

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.post('save', function (error: any, doc: any, next: any) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new UniqueKeyError('Email already exits.'))
  } else {
    next()
  }
})

const UserModel = model<IUser>('User', userSchema)

export default UserModel
