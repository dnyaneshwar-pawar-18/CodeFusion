import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './src/lib/db.js';
import authRoutes from './src/routes/auth.route.js'
import jobsRoute from './src/routes/jobs.route.js'
import mentorRoutes from './src/routes/mentor.route.js'
import resourceRoutes from './src/routes/resources.route.js'
import cors from 'cors'

dotenv.config();


const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json({ limit: "10mb" })); // { limit: "10mb" }
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

// 

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoute);
app.use('/api/mentor', mentorRoutes);
app.use('/api/resource', resourceRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
    connectDB();
})