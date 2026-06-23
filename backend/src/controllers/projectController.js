const {
  getAllProjects,
  getProjectById: fetchProjectById,
  createProject: addProject,
  updateProject: editProject,
  deleteProject: removeProject
} = require('../services/projectService');
const { sendSuccess, sendError } = require('../utils/response');

// ─── GET /api/projects ─────────────────────────────────────────────
// Public — returns all projects, supports ?category= and ?status= filters
const getProjects = async (req, res, next) => {
  try {
    const { category, status } = req.query;

    const result = await getAllProjects({ category, status });

    if (!result.success) {
      return sendError(res, 500, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data.projects);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/projects/:id ─────────────────────────────────────────
// Public — returns a single project
const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await fetchProjectById(id);

    if (!result.success) {
      return sendError(res, 404, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data.project);
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/projects ────────────────────────────────────────────
// Protected (JWT) — admin creates a new project
const createProject = async (req, res, next) => {
  try {
    const { project_name, category, description } = req.body;

    // Validate required fields
    if (!project_name || !category || !description) {
      return sendError(res, 400, 'project_name, category, and description are required');
    }

    const result = await addProject(req.body);

    if (!result.success) {
      return sendError(res, 500, result.message);
    }

    return sendSuccess(res, 201, result.message, result.data.project);
  } catch (error) {
    next(error);
  }
};

// ─── PUT /api/projects/:id ─────────────────────────────────────────
// Protected (JWT) — admin updates an existing project
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await editProject(id, req.body);

    if (!result.success) {
      return sendError(res, 404, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data.project);
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/projects/:id ──────────────────────────────────────
// Protected (JWT) — admin deletes a project
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await removeProject(id);

    if (!result.success) {
      return sendError(res, 404, result.message);
    }

    return sendSuccess(res, 200, result.message, result.data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
