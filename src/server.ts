import express from 'express';
import { Request, Response, Router } from 'express';
import { LogTypes, logger } from './utils/logger';
import { rateLimiter } from './middleware/router/rateLimiter';

const app = express();
const router = Router();

app.use(router);

app.get('/limited', rateLimiter, (req: Request, res: Response) => {
  res.status(200).send('Limited endpoint hit!');
});

app.get('/unlimited', (req: Request, res: Response) => {
  res.status(200).send('Unlimited endpoint hit!');
});

app.listen(3000, () => {
  logger(LogTypes.Info, 'Application started on port 3000!');
});
