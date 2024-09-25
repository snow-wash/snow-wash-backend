const jwt = require('jsonwebtoken');
const baseResponse = require('../utils/response');
const User = require('../models/userModel');

const authMiddlewareSuperadmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided
  if (!token) {
    return res.status(403).json(baseResponse(403, null, 'No token provided.'));
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json(baseResponse(401, null, 'Unauthorized!'));
    }

    // Store the user ID in the request object
    req.userId = decoded.id;

    const userId = req.userId
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json(baseResponse(404, null, 'Invalid User'));
    }

    if(user.role !== 'SUPERADMIN'){
      return res
        .status(403)
        .json(baseResponse(403, null, 'Forbidden Access'));
    }
    
    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = authMiddlewareSuperadmin;
