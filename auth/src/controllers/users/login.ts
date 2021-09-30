import * as bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { validationResult } from 'express-validator'
import * as jwt from 'jsonwebtoken'
import ApiValidationError from '../../errors/ApiValidationError'
import BadRequest from '../../errors/BadRequest'
import NotFoundError from '../../errors/NotFoundError'
import UserModel from '../../models/user'
import { LoginPayload, LoginResponse, TokenPayload } from '../../types'

const login: RequestHandler<{}, LoginResponse, LoginPayload> = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new ApiValidationError(errors.array())
  }

  const { username, password } = req.body
  const user = await UserModel.findOne({ username })
  if (!user) {
    throw new NotFoundError('User not found.')
  }

  const isPasswordMatching = await bcrypt.compare(password, user.password)

  if (!isPasswordMatching) {
    throw new BadRequest('Wrong password.')
  }

  const payload: TokenPayload = { id: user._id, username: user.username }

  const token = jwt.sign(payload, 'secret')

  return res.json({
    token,
    username
  })
}

export default login
