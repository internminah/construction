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
      conditions.push(`status = $${params.length}`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY id ASC';

    const result = await db.query(query, params);
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query(
      'SELECT id, project_name, category, description, image, status, service_id FROM public.portfolio WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  static async create({ project_name, category, description, image, status, service_id }) {
    const result = await db.query(
      'INSERT INTO public.portfolio (project_name, category, description, image, status, service_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, project_name, category, description, image, status, service_id',
      [project_name, category, description, image || null, status || 'ongoing', service_id || null]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { project_name, category, description, image, status, service_id } = data;
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
      [project_name, category, description, image, status, service_id, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM public.portfolio WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Project;
