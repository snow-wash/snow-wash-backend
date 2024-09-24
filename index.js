const express = require('express');
const cors = require('cors'); // Import the cors package
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const servicesCategoryRoutes = require('./routes/servicesCategoryRoutes');
const quotaRoutes = require('./routes/quotaRoutes');
const quotaHistoryRoutes = require('./routes/quotaHistoryRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

require('dotenv').config();

const app = express();

// Middleware to enable CORS
app.use(cors()); // This will allow all cross-origin requests

// Middleware to parse JSON requests
app.use(express.json());

// Authentication Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/services-category', servicesCategoryRoutes);
app.use('/api/quotas', quotaRoutes);
app.use('/api/quota-history', quotaHistoryRoutes);
app.use('/api/transactions', transactionRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to SnowWash Backend API');
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    data: null,
    code: 404,
    message: 'Endpoint tidak ditemukan',
  });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
