const { loginAdmin, logoutAdmin } = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/response');

// ─── POST /api/auth/login ──────────────────────────────────────────
// Public — admin login, returns Supabase session token
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
// Protected — Call authService to sign out of Supabase session
const logout = async (req, res, next) => {
  try {
    const result = await logoutAdmin();
    return sendSuccess(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout };
