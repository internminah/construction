// TODO: const Project = require('../models/projectModel');

/**
 * Get all construction projects with optional filters
 * @param {{ category?: string, status?: string }} filters
 * @returns {{ success: boolean, message: string, data: object }}
 */
const getAllProjects = async (filters = {}) => {
  try {
    const { category, status } = filters;

    // TODO: const projects = await Project.findAll({ category, status });
    let placeholderProjects = [
      {
        id: 1,
        project_name: 'Greenwood Villas',
        category: 'residential',
        description: 'Luxury residential villa complex with 24 units.',
        image: null,
        status: 'completed'
      },
      {
        id: 2,
        project_name: 'Skyline Business Park',
        category: 'commercial',
        description: 'A modern multi-story commercial office complex.',
        image: null,
        status: 'ongoing'
      },
      {
        id: 3,
        project_name: 'Maple Heights Apartments',
        category: 'residential',
        description: 'Affordable housing project with 120 units.',
        image: null,
        status: 'ongoing'
      }
    ];

    // Apply filters on placeholder data

    if (category) {
      placeholderProjects = placeholderProjects.filter(
        (p) => p.category === category
      );
    }
    if (status) {
      placeholderProjects = placeholderProjects.filter(
        (p) => p.status === status
      );
    }

    return {
      success: true,
      message: 'Projects retrieved successfully',
      data: { projects: placeholderProjects }
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
    // TODO: const project = await Project.findById(id);
    const project = null; // remove once Sufiyan's model is ready

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
    const { project_name, category, description, image, status } = data;

    // TODO: const newProject = await Project.create({ project_name, category, description, image, status });
    const placeholderProject = {
      id: Math.floor(Math.random() * 1000) + 4,
      project_name,
      category,
      description,
      image: image || null,
      status: status || 'ongoing',
      createdAt: new Date().toISOString()
    };

    return {
      success: true,
      message: 'Project created successfully',
      data: { project: placeholderProject }
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
    // TODO: const updatedProject = await Project.update(id, data);
    const placeholderUpdatedProject = {
      id: parseInt(id),
      ...data,
      updatedAt: new Date().toISOString()
    };

    return {
      success: true,
      message: 'Project updated successfully',
      data: { project: placeholderUpdatedProject }
    };
  } catch (error) {
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
    // TODO: await Project.delete(id);
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
