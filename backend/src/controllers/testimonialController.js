const {
  getAllTestimonials,
  getTestimonialById: fetchTestimonialById,
  createTestimonial: addTestimonial,
  deleteTestimonial: removeTestimonial
} = require('../services/testimonialService');
const { sendSuccess, sendError } = require('../utils/response');

// ─── GET /api/testimonials ─────────────────────────────────────────
// Public — returns all approved testimonials
const getTestimonials = async (req, res, next) => {
  try {
    const result = await getAllTestimonials();

    if (!result.success) {
      return sendError(res, 500, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data.testimonials);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/testimonials/:id ─────────────────────────────────────
// Protected (JWT) — admin views a single testimonial
const getTestimonialById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await fetchTestimonialById(id);

    if (!result.success) {
      return sendError(res, 404, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data.testimonial);
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/testimonials ────────────────────────────────────────
// Public — customer submits a review
const createTestimonial = async (req, res, next) => {
  try {
    const { customer_name, rating, review } = req.body;

    // Validate required fields
    if (!customer_name || !rating || !review) {
      return sendError(res, 400, 'customer_name, rating, and review are required');
    }

    // Validate rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      return sendError(res, 400, 'Rating must be between 1 and 5');
    }

    const result = await addTestimonial(req.body);

    if (!result.success) {
      return sendError(res, 500, result.message);
    }

    return sendSuccess(res, 201, result.message, result.data.testimonial);
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/testimonials/:id ─────────────────────────────────
// Protected (JWT) — admin deletes a testimonial
const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await removeTestimonial(id);

    if (!result.success) {
      return sendError(res, 404, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  deleteTestimonial
};
