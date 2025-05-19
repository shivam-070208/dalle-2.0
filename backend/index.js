import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    
  res.send('Hello from DALL-E!');
});
   
app.listen(3000)