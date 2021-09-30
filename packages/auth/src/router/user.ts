import { Router } from 'express'
import { body, param } from 'express-validator'
import usersController from '../controllers/users'

const router = Router()

router.get('/', usersController.getAll)
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Please enter a valid username.'),
    body('password').notEmpty().withMessage('Password is required.')
  ],
  usersController.register
)
router.post('/login', [
  body('username').notEmpty().withMessage('Please enter a valid username.'),
  body('password').notEmpty().withMessage('Password is required.')
], usersController.login)
router.get('/:username', param('username').isString().notEmpty().withMessage('Please enter a valid username.'), usersController.getUser)

export default router
