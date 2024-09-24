const pool = require('../config/db');

class Quota {
  static async getAllQuotas() {
    const query = `SELECT * FROM quota ORDER BY id ASC`;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getQuotaById(id) {
    const query = `SELECT * FROM quota WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async createQuota(name, quota_limit) {
    const query = `
      INSERT INTO quota (name, quota_limit, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [name, quota_limit]);
    return rows[0];
  }

  static async updateQuota(id, name, quota_limit) {
    const query = `
      UPDATE quota
      SET name = $1, quota_limit = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [name, quota_limit, id]);
    return rows[0];
  }

  static async deleteQuota(id) {
    const query = `DELETE FROM quota WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = Quota;
