const Contact = require('../models/Contact');

/**
 * Submit a new contact inquiry
 * @param {object} inquiryData
 * @returns {{ success: boolean, message: string, data: object }}
 */
const submitInquiry = async (inquiryData) => {
  try {
    const newInquiry = await Contact.create(inquiryData);

    return {
      success: true,
      message: 'Inquiry submitted successfully',
      data: { inquiry: newInquiry }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to submit inquiry',
      data: {}
    };
  }
};

/**
 * Retrieve all contact inquiries
 * @returns {{ success: boolean, message: string, data: object }}
 */
const getAllInquiries = async () => {
  try {
    const inquiries = await Contact.findAll();

    return {
      success: true,
      message: 'Inquiries retrieved successfully',
      data: { inquiries }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to retrieve inquiries',
      data: {}
    };
  }
};

/**
 * Get inquiry by ID
 * @param {string} id
 * @returns {{ success: boolean, message: string, data: object }}
 */
const getInquiryById = async (id) => {
  try {
    const inquiry = await Contact.findById(id);

    if (!inquiry) {
      const error = new Error('Inquiry not found');
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      message: 'Inquiry details retrieved successfully',
      data: { inquiry }
    };
  } catch (error) {
    if (error.statusCode) throw error;
    return {
      success: false,
      message: error.message || 'Failed to retrieve inquiry details',
      data: {}
    };
  }
};

/**
 * Delete an inquiry
 * @param {string} id
 * @returns {{ success: boolean, message: string, data: object }}
 */
const deleteInquiry = async (id) => {
  try {
    const deleted = await Contact.delete(id);

    if (!deleted) {
      return {
        success: false,
        message: 'Inquiry not found or already deleted',
        data: {}
      };
    }

    return {
      success: true,
      message: 'Inquiry deleted successfully',
      data: { id: parseInt(id) }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to delete inquiry',
      data: {}
    };
  }
};

module.exports = {
  submitInquiry,
  getAllInquiries,
  getInquiryById,
  deleteInquiry
};
