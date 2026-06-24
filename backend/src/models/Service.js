const db = require('../config/db');

class Service {
  static async findAll() {
    const result = await db.query('SELECT id, title AS name, description, image FROM public.services ORDER BY id ASC');
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT id, title AS name, description, image FROM public.services WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create({ name, title, description, image }) {
    const serviceTitle = name || title;
    const result = await db.query(
      'INSERT INTO public.services (title, description, image) VALUES ($1, $2, $3) RETURNING id, title AS name, description, image',
      [serviceTitle, description, image]
    );
    return result.rows[0];
  }

  static async update(id, { name, title, description, image }) {
    const serviceTitle = name || title;
    const result = await db.query(
      'UPDATE public.services SET title = COALESCE($1, title), description = COALESCE($2, description), image = COALESCE($3, image) WHERE id = $4 RETURNING id, title AS name, description, image',
      [serviceTitle, description, image, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM public.services WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Service;
