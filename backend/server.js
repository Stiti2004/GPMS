require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');  // Example user routes

const app = express();

// Middleware
app.use(express.json());  // Parse JSON request body
app.use(cors());          // Enable CORS

// Routes
app.use('/api/users', userRoutes);  // User-related routes

// Start server
const PORT = process.env.PORT || 5000;  // Use .env PORT or default to 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
