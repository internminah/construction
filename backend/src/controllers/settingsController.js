const CompanySettings = require('../models/settingsModel');
const { sendSuccess, sendError } = require('../utils/response');

const getSettings = (req, res, next) => {
  try {
    const settings = CompanySettings.get();
    if (!settings) {
      return sendError(res, 500, 'Failed to load company settings');
    }
    return sendSuccess(res, 200, 'Company settings retrieved successfully', settings);
  } catch (error) {
    next(error);
  }
};

const updateSettings = (req, res, next) => {
  try {
    const {
      name,
      tagline,
      description,
      detailedDescription,
      foundedYear,
      address,
      email,
      phone,
      mapHref
    } = req.body;

    if (!name) {
      return sendError(res, 400, 'Company name is required');
    }

    const updated = CompanySettings.update({
      name, tagline, description, detailedDescription,
      foundedYear, address, email, phone, mapHref
    });

    return sendSuccess(res, 200, 'Company settings updated successfully', updated);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSettings, updateSettings };
