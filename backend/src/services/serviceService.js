const Service = require('../models/Service');

/**
 * Get all construction services
 */
const getAllServices = async () => {
  try {
    const services = await Service.findAll();

    return {
      success: true,
      message: 'Services retrieved successfully',
      data: { services }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to retrieve services',
      data: {}
    };
  }
};

/**
 * Get a specific construction service by ID
 */
const getServiceById = async (id) => {
  try {
    const service = await Service.findById(id);

    if (!service) {
      const error = new Error('Service not found');
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      message: 'Service details retrieved successfully',
      data: { service }
    };
  } catch (error) {
    if (error.statusCode) throw error;
    return {
      success: false,
      message: error.message || 'Failed to retrieve service',
      data: {}
    };
  }
};

/**
 * Create a new construction service
 */
const createService = async (serviceData) => {
  try {
    const newService = await Service.create(serviceData);

    return {
      success: true,
      message: 'Service created successfully',
      data: { service: newService }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to create service',
      data: {}
    };
  }
};

/**
 * Update an existing construction service
 */
const updateService = async (id, serviceData) => {
  try {
    const updatedService = await Service.update(id, serviceData);

    if (!updatedService) {
      const error = new Error('Service not found');
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      message: 'Service updated successfully',
      data: { service: updatedService }
    };
  } catch (error) {
    if (error.statusCode) throw error;
    return {
      success: false,
      message: error.message || 'Failed to update service',
      data: {}
    };
  }
};

/**
 * Delete a construction service
 */
const deleteService = async (id) => {
  try {
    const deleted = await Service.delete(id);

    if (!deleted) {
      return {
        success: false,
        message: 'Service not found or already deleted',
        data: {}
      };
    }

    return {
      success: true,
      message: 'Service deleted successfully',
      data: { id: parseInt(id) }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to delete service',
      data: {}
    };
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};
