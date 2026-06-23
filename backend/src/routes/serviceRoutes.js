const express = require('express');
const router = express.Router();

const {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} = require('../controllers/serviceController');

const { protect } = require('../middleware/authMiddleware');

// ─── Public Routes ─────────────────────────────────────────────────
router.get('/', getServices);
router.get('/:id', getServiceById);

// ─── Protected Routes (Admin only — JWT required) ──────────────────
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
