const supabase = require('../config/supabase');

/**
 * Login an admin user using Supabase Auth
 * @param {string} email
 * @param {string} password
 * @returns {{ success: boolean, message: string, data: object }}
 */
const loginAdmin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const err = new Error(error.message);
    err.statusCode = error.status || 401;
    throw err;
  }

  return {
    success: true,
    message: 'Login successful',
    data: {
      token: data.session.access_token,
      session: data.session,
      user: data.user
    }
  };
};

/**
 * Logout the user session using Supabase Auth
 * @returns {{ success: boolean, message: string }}
 */
const logoutAdmin = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    const err = new Error(error.message);
    err.statusCode = error.status || 500;
    throw err;
  }

  return {
    success: true,
    message: 'Logged out successfully'
  };
};

module.exports = { loginAdmin, logoutAdmin };
