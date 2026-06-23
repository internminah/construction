const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 401, 'Not authorized, no token');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return sendError(res, 401, 'Not authorized, invalid token');
  }
};

module.exports = { protect };
