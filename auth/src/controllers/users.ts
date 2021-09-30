import * as bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { validationResult } from 'express-validator'
import ApiValidationError from '../errors/ApiValidationError'
import UserModel from '../models/user'

const getAll: RequestHandler = async (req, res) => {
  const users = await UserModel.find()
  return res.json(users.map(({ password, username, _id }) => ({ username, _id })))
}

const register: RequestHandler<{}, {}, { username: string, password: string }> = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new ApiValidationError(errors.array())
  }

  const hashedPass = await bcrypt.hash(req.body.password, 10)

  const user = new UserModel({ username: req.body.username, password: hashedPass })
  await user.save()
  return res.json(user)
}

const usersController = {
  getAll,
  register
}

export default usersController
