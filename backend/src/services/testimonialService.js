// TODO: const Testimonial = require('../models/testimonialModel');

/**
 * Get all approved testimonials
 * @returns {{ success: boolean, message: string, data: object }}
 */
const getAllTestimonials = async () => {
  try {
    // TODO: const testimonials = await Testimonial.findAll({ where: { approved: true } });
    const placeholderTestimonials = [
      {
        id: 1,
        customer_name: 'Rahul Sharma',
        rating: 5,
        review: 'Excellent work on our home renovation. Highly recommend I Constructions!',
        approved: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        customer_name: 'Priya Mehta',
        rating: 4,
        review: 'Very professional team. Delivered the project on time.',
        approved: true,
        createdAt: new Date().toISOString()
      }
    ];

    return {
      success: true,
      message: 'Testimonials retrieved successfully',
      data: { testimonials: placeholderTestimonials }
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
    // TODO: const testimonial = await Testimonial.findById(id);
    const testimonial = null; // remove once Sufiyan's model is ready

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
    const { customer_name, rating, review } = data;

    // TODO: const newTestimonial = await Testimonial.create({ customer_name, rating, review, approved: false });
    const placeholderTestimonial = {
      id: Math.floor(Math.random() * 1000) + 3,
      customer_name,
      rating: parseInt(rating),
      review,
      approved: false, // admin must approve before it goes public
      createdAt: new Date().toISOString()
    };

    return {
      success: true,
      message: 'Testimonial submitted successfully. It will appear once approved.',
      data: { testimonial: placeholderTestimonial }
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
    // TODO: await Testimonial.delete(id);
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
