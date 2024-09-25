const jwt = require('jsonwebtoken');
const baseResponse = require('../utils/response');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided
  if (!token) {
    return res.status(403).json(baseResponse(403, null, 'No token provided.'));
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json(baseResponse(401, null, 'Unauthorized!'));
    }

    // Store the user ID in the request object
    req.userId = decoded.id;
    
    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = authMiddleware;
