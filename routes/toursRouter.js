import express from 'express'

import { getCurrentTour, changeCurrentTour, getTours, sendTours,deleteTour , checkBody } from '../controllers/toursController.js'

const toursRouter = express.Router()

// toursRouter.param('id', checkId)

toursRouter.route('/').get(getTours).post(checkBody ,sendTours)
toursRouter.route('/:id').get(getCurrentTour).patch(changeCurrentTour).delete(deleteTour)

export default toursRouter