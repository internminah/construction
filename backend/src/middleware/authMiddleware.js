const supabase = require('../config/supabase');
const { sendError } = require('../utils/response');

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

    // Set the user information on req.admin for controllers
    req.admin = {
      id: user.id,
      email: user.email,
      role: user.app_metadata?.role || user.user_metadata?.role || 'admin'
    };

    next();
  } catch (error) {
    return sendError(res, 401, 'Not authorized, token verification failed');
  }
};

module.exports = { protect };
