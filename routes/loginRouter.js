import express from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/usersController.js';

const loginRouter = express.Router();

loginRouter
  .route('/')
  .post(
    [
      check('email', 'Incorrect email').isEmail(),
      check('password', 'Incorrect password').exists(),
    ],
    login
  );

export default loginRouter;
