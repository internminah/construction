const express = require('express');
const router = express.Router();

const { login, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// ─── Public Routes ─────────────────────────────────────────────────
router.post('/login', login);

// ─── Protected Routes (Admin only — JWT required) ──────────────────
router.post('/logout', protect, logout);

module.exports = router;
