const { loginAdmin } = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/response');

// ─── POST /api/auth/login ──────────────────────────────────────────
// Public — admin login, returns JWT token
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return sendError(res, 400, 'Email and password are required');
    }

    const result = await loginAdmin(email, password);

    return sendSuccess(res, 200, 'Login successful', { token: result.data.token });
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/auth/logout ─────────────────────────────────────────
// Protected — JWT is stateless, no DB call needed, client discards token
const logout = async (req, res, next) => {
  try {
    return sendSuccess(res, 200, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout };
