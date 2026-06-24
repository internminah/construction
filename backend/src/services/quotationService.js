const Quotation = require('../models/Quotation');

/**
 * Submit a new quotation request (public)
 * @param {{ customer_name: string, email: string, phone: string, project_type: string, project_details: string }} data
 * @returns {{ success: boolean, message: string, data: object }}
 */
const submitQuotation = async (data) => {
  try {
    const newQuotation = await Quotation.create(data);

    return {
      success: true,
      message: 'Quotation request submitted successfully. We will get back to you soon.',
      data: { quotation: newQuotation }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to submit quotation request',
      data: {}
    };
  }
};

/**
 * Get all quotation requests — admin only
 * @returns {{ success: boolean, message: string, data: object }}
 */
const getAllQuotations = async () => {
  try {
    const quotations = await Quotation.findAll();

    return {
      success: true,
      message: 'Quotations retrieved successfully',
      data: { quotations }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to retrieve quotations',
      data: {}
    };
  }
};

/**
 * Get a single quotation by ID — throws 404 if not found
 * @param {string} id
 * @returns {{ success: boolean, message: string, data: object }}
 */
const getQuotationById = async (id) => {
  try {
    const quotation = await Quotation.findById(id);

    if (!quotation) {
      const error = new Error('Quotation not found');
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      message: 'Quotation retrieved successfully',
      data: { quotation }
    };
  } catch (error) {
    if (error.statusCode) throw error;
    return {
      success: false,
      message: error.message || 'Failed to retrieve quotation',
      data: {}
    };
  }
};

/**
 * Delete a quotation by ID — admin only
 * @param {string} id
 * @returns {{ success: boolean, message: string, data: object }}
 */
const deleteQuotation = async (id) => {
  try {
    const deleted = await Quotation.delete(id);

    if (!deleted) {
      return {
        success: false,
        message: 'Quotation not found or already deleted',
        data: {}
      };
    }

    return {
      success: true,
      message: 'Quotation deleted successfully',
      data: { id: parseInt(id) }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to delete quotation',
      data: {}
    };
  }
};

module.exports = {
  submitQuotation,
  getAllQuotations,
  getQuotationById,
  deleteQuotation
};
