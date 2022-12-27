import express from 'express';
import { check } from 'express-validator';

import { register } from '../controllers/usersController.js';

const registerRouter = express.Router();

registerRouter
  .route('/')
  .post(
    [
      check('email', 'Incorrect email').isEmail(),
      check('password', 'Incorrect password').isLength({ min: 6 }),
    ],
    register
  );

export default registerRouter;
