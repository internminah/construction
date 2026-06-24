const db = require('../config/db');

class Testimonial {
  static async findAll() {
    const result = await db.query('SELECT id, customer_name, rating, review, user_id FROM public.reviews ORDER BY id ASC');
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT id, customer_name, rating, review, user_id FROM public.reviews WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create({ customer_name, rating, review, user_id }) {
    const result = await db.query(
      'INSERT INTO public.reviews (customer_name, rating, review, user_id) VALUES ($1, $2, $3, $4) RETURNING id, customer_name, rating, review, user_id',
      [customer_name, parseInt(rating), review, user_id || null]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM public.reviews WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Testimonial;
