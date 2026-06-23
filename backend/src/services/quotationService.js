// TODO: const Quotation = require('../models/Quotation');

/**
 * Submit a new quotation request (public)
 * @param {{ customer_name: string, email: string, phone: string, project_type: string, project_details: string }} data
 * @returns {{ success: boolean, message: string, data: object }}
 */
const submitQuotation = async (data) => {
  try {
    const { customer_name, email, phone, project_type, project_details } = data;

    // TODO: const newQuotation = await Quotation.create({ customer_name, email, phone, project_type, project_details });
    const placeholderQuotation = {
      id: Math.floor(Math.random() * 1000) + 1,
      customer_name,
      email,
      phone,
      project_type,
      project_details,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    return {
      success: true,
      message: 'Quotation request submitted successfully. We will get back to you soon.',
      data: { quotation: placeholderQuotation }
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
    // TODO: const quotations = await Quotation.findAll();
    const placeholderQuotations = [
      {
        id: 1,
        customer_name: 'Amit Verma',
        email: 'amit@example.com',
        phone: '9876543210',
        project_type: 'Residential Construction',
        project_details: 'Need a 3BHK house built on 1200 sqft plot.',
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        customer_name: 'Sneha Patil',
        email: 'sneha@example.com',
        phone: '9123456780',
        project_type: 'Interior Design',
        project_details: 'Office interior redesign for 3000 sqft space.',
        status: 'reviewed',
        createdAt: new Date().toISOString()
      }
    ];

    return {
      success: true,
      message: 'Quotations retrieved successfully',
      data: { quotations: placeholderQuotations }
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
    // TODO: const quotation = await Quotation.findById(id);
    const quotation = null; // remove once Sufiyan's model is ready

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
    // TODO: await Quotation.delete(id);
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
