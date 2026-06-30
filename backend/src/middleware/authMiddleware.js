const supabase = require('../config/supabase');
const { sendError } = require('../utils/response');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 401, 'Not authorized, no token');
    }

    const token = authHeader.split(' ')[1];

    // Verify token and fetch user details from Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return sendError(res, 401, 'Not authorized, invalid token');
    }

    // Fetch user details from PostgreSQL database by email (public.users.id ≠ Supabase Auth UUID)
    const dbUser = await User.findByEmail(user.email);

    // Set the user information on req.admin for controllers
    req.admin = {
      id: user.id,
      email: user.email,
      username: dbUser ? dbUser.username.trim() : 'System Administrator',
      role: dbUser ? dbUser.role : (user.app_metadata?.role || user.user_metadata?.role || 'admin')
    };

    next();
  } catch (error) {
    return sendError(res, 401, 'Not authorized, token verification failed');
  }
};

module.exports = { protect };
