const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh-token', authController.refreshToken);
// In authRoutes.js
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

router.get('/protected', authMiddleware, (req, res) => {
  res
    .status(200)
    .json(baseResponse(200, { userId: req.userId }, 'Access granted'));
});

module.exports = router;
