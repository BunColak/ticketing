import { RequestHandler } from 'express'
import { validationResult } from 'express-validator'
import ApiValidationError from '../../errors/ApiValidationError'
import NotFoundError from '../../errors/NotFoundError'
import UserModel from '../../models/user'

const getUser: RequestHandler<{ username: string }> = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ApiValidationError(errors.array())
  }

  const { username } = req.params

  const user = await UserModel.findOne({ username }, 'username')

  if (!user) {
    throw new NotFoundError('User not found.')
  }

  return res.json(user)
}

export default getUser
