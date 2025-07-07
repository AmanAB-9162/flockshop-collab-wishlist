const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const wishlistRoutes = require('./routes/wishlist');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/wishlist', wishlistRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running');
      console.log('MongoDB Connected')
      
    });
  }).catch((err) => console.error("❌ MongoDB error:", err));