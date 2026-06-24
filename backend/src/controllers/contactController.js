const {
  submitInquiry,
  getAllInquiries,
  getInquiryById: fetchInquiryById,
  updateInquiryStatus: editInquiryStatus,
  deleteInquiry: removeInquiry
} = require('../services/contactService');
const { sendSuccess, sendError } = require('../utils/response');

// ─── POST /api/contact ─────────────────────────────────────────────
// Public — submit a contact form inquiry
const createInquiry = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return sendError(res, 400, 'Name, email, and message are required');
    }

    const result = await submitInquiry(req.body);

    if (!result.success) {
      return sendError(res, 500, result.message);
    }

    return sendSuccess(res, 201, result.message, result.data.inquiry);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/contact ──────────────────────────────────────────────
// Protected (JWT) — retrieve all inquiries
const getInquiries = async (req, res, next) => {
  try {
    const result = await getAllInquiries();

    if (!result.success) {
      return sendError(res, 500, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data.inquiries);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/contact/:id ──────────────────────────────────────────
// Protected (JWT) — retrieve single inquiry details
const getInquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await fetchInquiryById(id);

    if (!result.success) {
      return sendError(res, 404, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data.inquiry);
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/contact/:id ───────────────────────────────────────
// Protected (JWT) — delete an inquiry
const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await removeInquiry(id);

    if (!result.success) {
      return sendError(res, 404, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  getInquiryById,
  deleteInquiry
};
