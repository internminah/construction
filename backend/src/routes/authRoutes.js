const express = require('express');
const router = express.Router();

const { login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// ─── Public Routes ─────────────────────────────────────────────────
router.post('/login', login);

// ─── Protected Routes (Admin only — JWT required) ──────────────────
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
