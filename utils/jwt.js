// utils/jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    bod: user.bod,
    iat: Math.floor(Date.now() / 1000), // Issued at
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    bod: user.bod,
    iat: Math.floor(Date.now() / 1000), // Issued at
  };
  return jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, generateRefreshToken, verifyToken };
