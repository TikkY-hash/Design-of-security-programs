import express from 'express'
import {check} from 'express-validator'

import { getCurrentUser, changeCurrentUser, deleteUser, login, register } from '../controllers/usersController.js'

const usersRouter = express.Router()

usersRouter.route('/').get([
    check('email', 'Incorrect email').normalizeEmail().isEmail(),
    check('password', 'Incorrect password').exists()
], login).
post([
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect password').isLength({min : 6}) 
], 
register)
usersRouter.route('/:id').get(getCurrentUser).patch(changeCurrentUser).delete(deleteUser)

export default usersRouter