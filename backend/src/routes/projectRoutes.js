const express = require('express');
const router = express.Router();

const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

const { protect } = require('../middleware/authMiddleware');

// ─── Public Routes ─────────────────────────────────────────────────
router.get('/', getProjects);           // supports ?category= and ?status= query filters
router.get('/:id', getProjectById);

// ─── Protected Routes (Admin only — JWT required) ──────────────────
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
