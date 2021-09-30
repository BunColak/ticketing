import { RequestHandler } from 'express'
import UserModel from '../../models/user'

const getAll: RequestHandler = async (req, res) => {
  const users = await UserModel.find()
  return res.json(users.map(({ password, username, _id }) => ({ username, _id })))
}

export default getAll
