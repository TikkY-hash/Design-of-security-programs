import express from 'express';

import {
  getCurrentTour,
  changeCurrentTour,
  getTours,
  sendTours,
  deleteTour,
  checkBody,
} from '../controllers/toursController.js';

import { checkAuth } from '../controllers/usersController.js';

import jwt from 'jsonwebtoken';

const toursRouter = express.Router();

const test = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Non authorize' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Non authorize' });
  }
};

toursRouter.route('/').get(test, getTours).post(test, sendTours);
toursRouter
  .route('/:id')
  .get(getCurrentTour)
  .patch(changeCurrentTour)
  .delete(deleteTour);

export default toursRouter;
