import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import connectionToDB from './config/connectDB.js';
import { morganMiddleware, systemLogs } from './utils/Logger.js';
import mongoSanitize from 'express-mongo-sanitize';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { apiLimiter } from './middleware/apiLimiter.js';

await connectionToDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(mongoSanitize());

app.use(morganMiddleware);

app.get('/api/v1/test', (req, res) => {
  res.json({ message: 'test api' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', apiLimiter, userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 2001;

app.listen(PORT, () => {
  console.log(
    `${chalk.green('✓')} Server running in ${chalk.yellow.yellow(
      process.env.NODE_ENV
    )} mode on port ${chalk.blue.bold(process.env.PORT)}`
  );
  systemLogs.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
