const db = require('../config/db');

class User {
  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM public.users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM public.users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create({ username, email, password, role }) {
    const result = await db.query(
      'INSERT INTO public.users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, password, role]
    );
    return result.rows[0];
  }
}

module.exports = User;
