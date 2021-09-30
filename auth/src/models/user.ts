import { model, Schema } from 'mongoose'
import type { IUser } from '../types'

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const UserModel = model<IUser>('User', userSchema)

export default UserModel
