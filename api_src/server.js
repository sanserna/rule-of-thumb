import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import config from './config';
import { connect } from './utils/db';
import { signup, signin } from './utils/auth';
import userRouter from './resources/user/user.router';
import voteItemRouter from './resources/vote-item/vote-item.router';

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/signup', signup);
app.post('/signin', signin);

app.use('/api/user', userRouter);
app.use('/api/vote-item', voteItemRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
