const express = require('express');
const router = express.Router();

const {
  submitQuotation,
  getQuotations,
  getQuotationById,
  deleteQuotation
} = require('../controllers/quotationController');

const { protect } = require('../middleware/authMiddleware');

// ─── Public Routes ─────────────────────────────────────────────────
router.post('/', submitQuotation);

// ─── Protected Routes (Admin only — JWT required) ──────────────────
router.get('/', protect, getQuotations);
router.get('/:id', protect, getQuotationById);
router.delete('/:id', protect, deleteQuotation);

module.exports = router;
