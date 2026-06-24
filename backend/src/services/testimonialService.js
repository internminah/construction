const Testimonial = require('../models/Testimonial');

/**
 * Get all testimonials
 * @returns {{ success: boolean, message: string, data: object }}
 */
const getAllTestimonials = async () => {
  try {
    const testimonials = await Testimonial.findAll();

    return {
      success: true,
      message: 'Testimonials retrieved successfully',
      data: { testimonials }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to retrieve testimonials',
      data: {}
    };
  }
};

/**
 * Get a single testimonial by ID — throws 404 if not found
 * @param {string} id
 * @returns {{ success: boolean, message: string, data: object }}
 */
const getTestimonialById = async (id) => {
  try {
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      const error = new Error('Testimonial not found');
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      message: 'Testimonial retrieved successfully',
      data: { testimonial }
    };
  } catch (error) {
    if (error.statusCode) throw error;
    return {
      success: false,
      message: error.message || 'Failed to retrieve testimonial',
      data: {}
    };
  }
};

/**
 * Create a new testimonial (submitted by a customer)
 * @param {{ customer_name: string, rating: number, review: string }} data
 * @returns {{ success: boolean, message: string, data: object }}
 */
const createTestimonial = async (data) => {
  try {
    const newTestimonial = await Testimonial.create(data);

    return {
      success: true,
      message: 'Testimonial submitted successfully.',
      data: { testimonial: newTestimonial }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to submit testimonial',
      data: {}
    };
  }
};

/**
 * Delete a testimonial by ID — admin only
 * @param {string} id
 * @returns {{ success: boolean, message: string, data: object }}
 */
const deleteTestimonial = async (id) => {
  try {
    const deleted = await Testimonial.delete(id);

    if (!deleted) {
      return {
        success: false,
        message: 'Testimonial not found or already deleted',
        data: {}
      };
    }

    return {
      success: true,
      message: 'Testimonial deleted successfully',
      data: { id: parseInt(id) }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to delete testimonial',
      data: {}
    };
  }
};

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  deleteTestimonial
};
