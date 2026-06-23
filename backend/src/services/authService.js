const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// TODO: const User = require('../models/userModel');

/**
 * Login an admin user
 * @param {string} email
 * @param {string} password
 * @returns {{ success: boolean, message: string, data: object }}
 */
const loginAdmin = async (email, password) => {
  // ─── Step 1: Find user by email ──────────────────────────────────
  // TODO: const user = await User.findByEmail(email);
  const user = null; // remove this once Sufiyan's model is ready

  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // ─── Step 2: Check role is admin ─────────────────────────────────
  if (user.role !== 'admin') {
    const error = new Error('Access denied. Admins only');
    error.statusCode = 403;
    throw error;
  }

  // ─── Step 3: Compare password with hashed password ───────────────
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // ─── Step 4: Generate JWT token ───────────────────────────────────
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  // ─── Step 5: Return token ─────────────────────────────────────────
  return {
    success: true,
    message: 'Login successful',
    data: {
      token,
      admin: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    }
  };
};

module.exports = { loginAdmin };
