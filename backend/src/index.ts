import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);
app.use(helmet());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Routes (mounted later)
import experiencesRouter from './routes/experiences';
import bookingsRouter from './routes/bookings';
import promoRouter from './routes/promo';

app.use('/experiences', experiencesRouter);
app.use('/bookings', bookingsRouter);
app.use('/promo', promoRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // Rudimentary error handler
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


