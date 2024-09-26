const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const baseResponse = require('../utils/response');
const {
  generateToken,
  generateRefreshToken,
  verifyToken,
} = require('../utils/jwt');

const authController = {
  async login(req, res) {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res
        .status(400)
        .json(
          baseResponse(
            400,
            null,
            'Email/Username dan password tidak boleh kosong',
          ),
        );
    }

    try {
      const user = await User.findByIdentifier(identifier);
      if (!user) {
        return res
          .status(400)
          .json(baseResponse(400, null, 'Email/Username atau password salah'));
      }

      const isPasswordValid =
        Buffer.from(password).toString('base64') === user.password;
      if (!isPasswordValid) {
        return res
          .status(400)
          .json(baseResponse(400, null, 'Email/Username atau password salah'));
      }

      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);
      await User.updateToken(user.id, token, refreshToken);

      res.status(200).json(baseResponse(200, user, 'Login berhasil'));
    } catch (error) {
      console.error('Login Error:', error);
      res
        .status(500)
        .json(baseResponse(500, null, 'Terjadi kesalahan pada server'));
    }
  },

  async register(req, res) {
    const { fullname, email, username, password } = req.body;

    if (!fullname || !email || !username || !password) {
      return res
        .status(400)
        .json(baseResponse(400, null, 'Semua field harus diisi'));
    }

    try {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res
          .status(400)
          .json(baseResponse(400, null, 'Email telah terdaftar'));
      }

      const newUser = await User.createUser({
        fullname,
        email,
        username,
        password,
      });

      const token = generateToken(newUser);
      const refreshToken = generateRefreshToken(newUser);
      await User.updateToken(newUser.id, token, refreshToken);

      newUser.token = token;
      newUser.refresh_token = refreshToken;

      res
        .status(201)
        .json(baseResponse(201, newUser, 'User berhasil didaftarkan'));
    } catch (error) {
      console.error('Registration Error:', error);
      res
        .status(500)
        .json(baseResponse(500, null, 'Terjadi kesalahan pada server'));
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json(baseResponse(400, null, 'Email tidak boleh kosong'));
    }

    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res
          .status(404)
          .json(baseResponse(404, null, 'User tidak ditemukan'));
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000);
      await User.updateResetToken(user.id, resetToken, resetTokenExpiry);

      const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: '587',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        to: user.email,
        from: `Snow Wash 👻 <gcyber21@gmail.com>`,
        subject: 'Password Reset',
        text: `Klik link berikut untuk reset password: ${resetLink}`,
      };

      await transporter.sendMail(mailOptions);

      res
        .status(200)
        .json(baseResponse(200, null, 'Email reset password telah dikirim'));
    } catch (error) {
      console.error('Forgot Password Error:', error);
      res.status(500).json(baseResponse(500, null, error.message));
    }
  },

  async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    if (!newPassword) {
      return res
        .status(400)
        .json(baseResponse(400, null, 'Password tidak boleh kosong'));
    }

    try {
      const user = await User.findByResetToken(token);
      if (!user) {
        return res
          .status(400)
          .json(
            baseResponse(400, null, 'Token tidak valid atau telah kedaluwarsa'),
          );
      }

      // const hashedPassword = Buffer.from(newPassword).toString('base64');
      // console.log(hashedPassword);
      await User.updatePassword(user.id, newPassword);

      res
        .status(200)
        .json(baseResponse(200, null, 'Password berhasil direset'));
    } catch (error) {
      console.error('Reset Password Error:', error);
      res
        .status(500)
        .json(baseResponse(500, null, 'Terjadi kesalahan pada server'));
    }
  },

  /**
   * Refresh the JWT token using a valid refresh token.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async refreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res
        .status(400)
        .json(baseResponse(400, null, 'Refresh token tidak boleh kosong'));
    }

    try {
      // Verify the refresh token
      const decoded = verifyToken(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );

      if (!decoded) {
        return res
          .status(400)
          .json(baseResponse(400, null, 'Refresh token tidak valid'));
      }

      // Find the user with the decoded token ID
      const user = await User.findById(decoded.id);
      if (!user || user.refresh_token !== refreshToken) {
        return res
          .status(400)
          .json(baseResponse(400, null, 'Refresh token tidak valid'));
      }

      // Generate a new access token
      const newToken = generateToken(user);
      const newRefreshToken = generateRefreshToken(user);

      // Update the user's refresh token in the database
      await User.updateToken(user.id, newToken, newRefreshToken);

      res
        .status(200)
        .json(
          baseResponse(
            200,
            { token: newToken, refreshToken: newRefreshToken },
            'Token berhasil diperbarui',
          ),
        );
    } catch (error) {
      console.error('Refresh Token Error:', error);
      res
        .status(500)
        .json(baseResponse(500, null, 'Terjadi kesalahan pada server'));
    }
  },
};

module.exports = authController;
