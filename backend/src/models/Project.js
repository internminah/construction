const db = require('../config/db');

class Project {
  static async findAll(filters = {}) {
    const { category, status } = filters;
    let query = 'SELECT id, project_name, category, description, image, status, service_id FROM public.portfolio';
    const params = [];
    const conditions = [];

    if (category) {
      params.push(category);
      conditions.push(`category = $${params.length}`);
    }
    if (status) {
      params.push(status);
      conditions.push(`(status = $${params.length} OR status LIKE $${params.length} || ':%')`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY id ASC';

    const result = await db.query(query, params);
    return result.rows.map(row => {
      let progressVal = 45;
      let statusVal = row.status;
      if (row.status && row.status.startsWith('In Progress:')) {
        const parts = row.status.split(':');
        statusVal = parts[0];
        progressVal = parseInt(parts[1]) || 50;
      } else if (row.status === 'In Progress') {
        progressVal = 50;
      } else if (row.status === 'Completed') {
        progressVal = 100;
      }
      return {
        ...row,
        status: statusVal,
        progress: progressVal
      };
    });
  }

  static async findById(id) {
    const result = await db.query(
      'SELECT id, project_name, category, description, image, status, service_id FROM public.portfolio WHERE id = $1',
      [id]
    );
    const row = result.rows[0];
    if (row) {
      let progressVal = 45;
      let statusVal = row.status;
      if (row.status && row.status.startsWith('In Progress:')) {
        const parts = row.status.split(':');
        statusVal = parts[0];
        progressVal = parseInt(parts[1]) || 50;
      } else if (row.status === 'In Progress') {
        progressVal = 50;
      } else if (row.status === 'Completed') {
        progressVal = 100;
      }
      row.status = statusVal;
      row.progress = progressVal;
    }
    return row || null;
  }

  static async create({ project_name, category, description, image, status, service_id, progress }) {
    let statusVal = status || 'ongoing';
    if (statusVal === 'In Progress' && progress !== undefined) {
      statusVal = `In Progress:${progress}`;
    }
    const result = await db.query(
      'INSERT INTO public.portfolio (project_name, category, description, image, status, service_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, project_name, category, description, image, status, service_id',
      [project_name, category, description, image || null, statusVal, service_id || null]
    );
    const row = result.rows[0];
    if (row) {
      let progressVal = 45;
      let sVal = row.status;
      if (row.status && row.status.startsWith('In Progress:')) {
        const parts = row.status.split(':');
        sVal = parts[0];
        progressVal = parseInt(parts[1]) || 50;
      } else if (row.status === 'In Progress') {
        progressVal = 50;
      } else if (row.status === 'Completed') {
        progressVal = 100;
      }
      row.status = sVal;
      row.progress = progressVal;
    }
    return row;
  }

  static async update(id, data) {
    const { project_name, category, description, image, status, service_id, progress } = data;
    
    const existingResult = await db.query('SELECT status FROM public.portfolio WHERE id = $1', [id]);
    const existing = existingResult.rows[0];
    
    let targetStatus = status;
    if (targetStatus === undefined && existing) {
      targetStatus = existing.status;
      if (targetStatus && targetStatus.startsWith('In Progress:')) {
        targetStatus = 'In Progress';
      }
    }
    
    let targetProgress = progress;
    if (targetStatus === 'In Progress' && targetProgress !== undefined) {
      targetStatus = `In Progress:${targetProgress}`;
    } else if (targetStatus === 'In Progress' && existing && existing.status.startsWith('In Progress:')) {
      targetStatus = existing.status;
    }

    const result = await db.query(
      `UPDATE public.portfolio 
       SET project_name = COALESCE($1, project_name),
           category = COALESCE($2, category),
           description = COALESCE($3, description),
           image = COALESCE($4, image),
           status = COALESCE($5, status),
           service_id = COALESCE($6, service_id)
       WHERE id = $7
       RETURNING id, project_name, category, description, image, status, service_id`,
      [project_name, category, description, image, targetStatus, service_id, id]
    );
    const row = result.rows[0] || null;
    if (row) {
      let progressVal = 45;
      let sVal = row.status;
      if (row.status && row.status.startsWith('In Progress:')) {
        const parts = row.status.split(':');
        sVal = parts[0];
        progressVal = parseInt(parts[1]) || 50;
      } else if (row.status === 'In Progress') {
        progressVal = 50;
      } else if (row.status === 'Completed') {
        progressVal = 100;
      }
      row.status = sVal;
      row.progress = progressVal;
    }
    return row;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM public.portfolio WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Project;
