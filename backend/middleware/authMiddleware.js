const jwt = require('jsonwebtoken');

// Middleware to protect routes that require authentication
const protect = (req, res, next) => {
    const token = req.header('Authorization'); // Get token from header
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach the decoded user data to the request
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { protect };
