const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authmiddleware'); 

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

  // Routes
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/profile', authMiddleware, (req, res) => {
  // Access user data from request object
  const userId = req.user.id;
  // Fetch user profile from database using userId
  res.json({ profile: 'User profile data' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
