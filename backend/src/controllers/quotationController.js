const {
  submitQuotation: addQuotation,
  getAllQuotations,
  getQuotationById: fetchQuotationById,
  deleteQuotation: removeQuotation
} = require('../services/quotationService');
const { sendSuccess, sendError } = require('../utils/response');

// ─── POST /api/quotations ──────────────────────────────────────────
// Public — visitor submits a quotation request
const submitQuotation = async (req, res, next) => {
  try {
    const { customer_name, email, phone, project_type, project_details } = req.body;

    // Validate required fields
    if (!customer_name || !email || !phone || !project_type || !project_details) {
      return sendError(res, 400, 'customer_name, email, phone, project_type, and project_details are required');
    }

    const result = await addQuotation(req.body);

    if (!result.success) {
      return sendError(res, 500, result.message);
    }

    return sendSuccess(res, 201, result.message, result.data.quotation);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/quotations ───────────────────────────────────────────
// Protected (JWT) — admin retrieves all quotation requests
const getQuotations = async (req, res, next) => {
  try {
    const result = await getAllQuotations();

    if (!result.success) {
      return sendError(res, 500, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data.quotations);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/quotations/:id ───────────────────────────────────────
// Protected (JWT) — admin views a single quotation request
const getQuotationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await fetchQuotationById(id);

    if (!result.success) {
      return sendError(res, 404, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data.quotation);
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/quotations/:id ────────────────────────────────────
// Protected (JWT) — admin deletes a quotation request
const deleteQuotation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await removeQuotation(id);

    if (!result.success) {
      return sendError(res, 404, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitQuotation,
  getQuotations,
  getQuotationById,
  deleteQuotation
};
