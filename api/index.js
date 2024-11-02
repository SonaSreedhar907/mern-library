import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
// import userRoutes from './routes/user.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO)
 .then(()=>{
    console.log('MongoDB is connected')
 }).catch((err)=>{
    console.log(err)
 })

const app = express()


app.use(express.json())
app.use(cookieParser());
app.listen(3002, () => {
    console.log('server is running on port 3002..')
})


// app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)


app.use((err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error';
   res.status(statusCode).json({
     success: false,
     statusCode,
     message,
   });
 });