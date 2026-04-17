const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const stateRoutes = require('./routes/stateRoutes');
const placeRoutes = require('./routes/placeRoutes');

const app = express();

// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('TravelBharat API is running...');
});

// api routes
app.use('/states', stateRoutes);
app.use('/places', placeRoutes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});