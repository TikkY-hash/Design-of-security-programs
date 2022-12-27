import { Tour } from '../models/tourModel.js';

export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find({ owner: req.user.userId }).populate('owner').exec();

    res.status(200).json({
      status: 'success',
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: err,
      },
    });
  }
};

export const sendTours = async (req, res) => {
  try {
    const newTour = await Tour.create({ ...req.body, owner: req.user.userId });

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      data: {
        tour: 'Incorrect data',
      },
    });
  }
};

export const getCurrentTour = async (req, res) => {
  try {
    const newTour = await Tour.findById(req.params.id);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: err,
      },
    });
  }
};

export const changeCurrentTour = async (req, res) => {
  try {
    const changedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'success',
      data: {
        tour: changedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: err,
      },
    });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndRemove(req.params.id, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'success',
      data: {
        tour: deletedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: err,
      },
    });
  }
};

export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'faile',
      message: 'The body is incorrect',
    });
  }
  next();
};
