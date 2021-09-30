import * as bcrypt from 'bcrypt'
import { Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'
import UserModel from '../models/user'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const users = await UserModel.find()
  return res.json(users)
})

router.post('/register', [body('username').isEmail(), body('password').notEmpty()], async (req: Request<{}, {}, {username: string, password: string}>, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const hashedPass = await bcrypt.hash(req.body.password, 10)

  const user = await UserModel.create({ username: req.body.username, password: hashedPass })
  return res.json(user)
})
router.post('/login', (req, res) => { })
router.get('/:id', (req, res) => { return res.json({ here: true }) })
router.put('/:id', (req, res) => { })
router.delete('/:id', (req, res) => { })

export default router
