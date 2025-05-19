import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();
connectDB();


const app = express();

const allowedOrigins = [
  'https://dalle-2-0-silk.vercel.app',
  'http://localhost:5173',
  'https://dalle-2-0-two.vercel.app'
];
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy: This origin is not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json({limit: '50mb'}));
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    
  res.send('Hello from DALL-E!');
});

// Only listen if not running in Vercel serverless
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
}

export default app;