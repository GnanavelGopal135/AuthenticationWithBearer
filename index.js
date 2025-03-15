import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Database/config.js';
import userRouter from './Router/user.router.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

connectDB();


app.use('/api/user', userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});