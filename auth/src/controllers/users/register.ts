import * as bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { validationResult } from 'express-validator'
import ApiValidationError from '../../errors/ApiValidationError'
import UserModel from '../../models/user'

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

export default register
