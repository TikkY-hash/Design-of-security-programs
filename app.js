import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import toursRouter from './routes/toursRouter.js';
import registerRouter from './routes/registerRouter.js';
import loginRouter from './routes/loginRouter.js';

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.time = new Date().toISOString();
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/tours', toursRouter);
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);

export default app;
