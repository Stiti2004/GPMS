const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const citizenRoutes = require('./routes/citizen');
const panchayatRoutes = require('./routes/panchayat');
const adminRoutes = require('./routes/admin');
const monitorRoutes = require('./routes/monitor');
const schemeRoutes = require('./routes/scheme');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000', // React app's URL
  credentials: true,
};
app.use(cors(corsOptions));

// Route middleware
app.use('/api/auth', authRoutes);
app.use('/api/citizens', citizenRoutes);
app.use('/api/panchayat', panchayatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/monitor', monitorRoutes);
app.use('/api/scheme', schemeRoutes);

// Home route
app.get('/home', (req, res) => {
  res.json({ message: 'Welcome to Gram Panchayat Management System' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});