const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/settings - Public
router.get('/', getSettings);

// PUT /api/settings - Protected (Admin only)
router.put('/', protect, updateSettings);

module.exports = router;
