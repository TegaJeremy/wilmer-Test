const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routers/userRouter');
const studentRoutes = require('./routers/studentRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', studentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`server is connected to ${PORT}`)
})
