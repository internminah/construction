const Project = require('../models/Project');

/**
 * Get all construction projects with optional filters
 * @param {{ category?: string, status?: string }} filters
 * @returns {{ success: boolean, message: string, data: object }}
 */
const getAllProjects = async (filters = {}) => {
  try {
    const projects = await Project.findAll(filters);

    return {
      success: true,
      message: 'Projects retrieved successfully',
      data: { projects }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to retrieve projects',
      data: {}
    };
  }
};

/**
 * Get a single project by ID — throws 404 if not found
 * @param {string} id
 * @returns {{ success: boolean, message: string, data: object }}
 */
const getProjectById = async (id) => {
  try {
    const project = await Project.findById(id);

    if (!project) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      message: 'Project retrieved successfully',
      data: { project }
    };
  } catch (error) {
    if (error.statusCode) throw error;
    return {
      success: false,
      message: error.message || 'Failed to retrieve project',
      data: {}
    };
  }
};

/**
 * Create a new construction project
 * @param {{ project_name: string, category: string, description: string, image: string, status: string }} data
 * @returns {{ success: boolean, message: string, data: object }}
 */
const createProject = async (data) => {
  try {
    const newProject = await Project.create(data);

    return {
      success: true,
      message: 'Project created successfully',
      data: { project: newProject }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to create project',
      data: {}
    };
  }
};

/**
 * Update an existing project by ID
 * @param {string} id
 * @param {object} data
 * @returns {{ success: boolean, message: string, data: object }}
 */
const updateProject = async (id, data) => {
  try {
    const updatedProject = await Project.update(id, data);

    if (!updatedProject) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      message: 'Project updated successfully',
      data: { project: updatedProject }
    };
  } catch (error) {
    if (error.statusCode) throw error;
    return {
      success: false,
      message: error.message || 'Failed to update project',
      data: {}
    };
  }
};

/**
 * Delete a project by ID
 * @param {string} id
 * @returns {{ success: boolean, message: string, data: object }}
 */
const deleteProject = async (id) => {
  try {
    const deleted = await Project.delete(id);

    if (!deleted) {
      return {
        success: false,
        message: 'Project not found or already deleted',
        data: {}
      };
    }

    return {
      success: true,
      message: 'Project deleted successfully',
      data: { id: parseInt(id) }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to delete project',
      data: {}
    };
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
