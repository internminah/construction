const express = require('express');
const router = express.Router();

const {
  createInquiry,
  getInquiries,
  getInquiryById,
  deleteInquiry
} = require('../controllers/contactController');

const { protect } = require('../middleware/authMiddleware');

// ─── Public Routes ─────────────────────────────────────────────────
router.post('/', createInquiry);

// ─── Protected Routes (Admin only — JWT required) ──────────────────
router.get('/', protect, getInquiries);
router.get('/:id', protect, getInquiryById);
router.delete('/:id', protect, deleteInquiry);

module.exports = router;
