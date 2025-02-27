const jwt = require('jsonwebtoken');

// Protect routes for authenticated users only
const protect = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach decoded user info to request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Authorize user roles (for example, only government monitors can access certain routes)
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = { protect, authorizeRole };
