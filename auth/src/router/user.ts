import { Router } from 'express'
import { body } from 'express-validator'
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
router.post('/login', (req, res) => { })
router.get('/:id', (req, res) => { return res.json({ here: true }) })
router.put('/:id', (req, res) => { })
router.delete('/:id', (req, res) => { })

export default router
