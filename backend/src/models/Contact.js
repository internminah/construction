const db = require('../config/db');

class Contact {
  static async create({ name, email, phone, message }) {
    const result = await db.query(
      'INSERT INTO public.contacts (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING id, name, email, phone, message',
      [name, email, phone ? parseInt(phone) : null, message]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await db.query('SELECT id, name, email, phone, message FROM public.contacts ORDER BY id ASC');
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT id, name, email, phone, message FROM public.contacts WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM public.contacts WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Contact;
