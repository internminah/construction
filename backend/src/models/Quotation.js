const db = require('../config/db');

class Quotation {
  static async create({ customer_name, email, phone, project_type, project_details, user_id }) {
    const result = await db.query(
      `INSERT INTO public.quotations (customer_name, email, phone, project_type, project_details, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, customer_name, email, phone, project_type, project_details, user_id`,
      [customer_name, email, phone ? BigInt(phone) : null, project_type, project_details, user_id || null]
    );

    // Convert BigInt phone back to string for json serialization if needed
    const row = result.rows[0];
    if (row && row.phone !== null) {
      row.phone = row.phone.toString();
    }
    return row;
  }

  static async findAll() {
    const result = await db.query('SELECT id, customer_name, email, phone, project_type, project_details, user_id FROM public.quotations ORDER BY id ASC');
    return result.rows.map(row => {
      if (row.phone !== null) {
        row.phone = row.phone.toString();
      }
      return row;
    });
  }

  static async findById(id) {
    const result = await db.query('SELECT id, customer_name, email, phone, project_type, project_details, user_id FROM public.quotations WHERE id = $1', [id]);
    const row = result.rows[0] || null;
    if (row && row.phone !== null) {
      row.phone = row.phone.toString();
    }
    return row;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM public.quotations WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Quotation;
