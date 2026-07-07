const {
    getAllServices,
    getServiceById: fetchServiceById,
    createService: addService,
    updateService: editService,
    deleteService: removeService
} = require('../services/serviceService');
const { sendSuccess, sendError } = require('../utils/response');

// ─── GET /api/services ─────────────────────────────────────────────
// Public — returns all construction services
const getServices = async (req, res, next) => {
    try {
        const result = await getAllServices();

        if (!result.success) {
            return sendError(res, 500, result.message);
        }

        return sendSuccess(res, 200, result.message, result.data.services);
    } catch (error) {
        next(error);
    }
};

// ─── GET /api/services/:id ─────────────────────────────────────────
// Public — returns a single service by ID
const getServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await fetchServiceById(id);

        if (!result.success) {
            return sendError(res, 404, result.message);
        }

        return sendSuccess(res, 200, result.message, result.data.service);
    } catch (error) {
        next(error);
    }
};

// ─── POST /api/services ────────────────────────────────────────────
// Protected (JWT) — admin creates a new service
const createService = async (req, res, next) => {
    try {
        const serviceData = req.body;

        const result = await addService(serviceData);

        if (!result.success) {
            return sendError(res, 400, result.message);
        }

        return sendSuccess(res, 201, result.message, result.data.service);
    } catch (error) {
        next(error);
    }
};

// ─── PUT /api/services/:id ─────────────────────────────────────────
// Protected (JWT) — admin updates an existing service
const updateService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const serviceData = req.body;

        const result = await editService(id, serviceData);

        if (!result.success) {
            return sendError(res, 404, result.message);
        }

        return sendSuccess(res, 200, result.message, result.data.service);
    } catch (error) {
        next(error);
    }
};

// ─── DELETE /api/services/:id ──────────────────────────────────────
// Protected (JWT) — admin deletes a service
const deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await removeService(id);

        if (!result.success) {
            return sendError(res, 404, result.message);
        }

        return sendSuccess(res, 200, result.message, result.data);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};

