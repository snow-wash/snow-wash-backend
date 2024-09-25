const pool = require('../config/db');

class Quota {
  // Get all quotas, ordered by ID
  static async getAllQuotas() {
    const query = `SELECT * FROM quota ORDER BY id ASC`;
    const { rows } = await pool.query(query);
    return rows;
  }

  // Find quota by ID
  static async getQuotaById(id) {
    const query = `SELECT * FROM quota WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Check if a quota name already exists, excluding a specific ID
  static async findByName(name, excludeId = null) {
    let query = `SELECT * FROM quota WHERE name = $1`;
    const values = [name];
    if (excludeId) {
      query += ' AND id != $2';
      values.push(excludeId);
    }
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  // Create a new quota with unique name validation
  static async createQuota(name, quota_limit) {
    const existingQuota = await this.findByName(name);
    if (existingQuota) {
      throw new Error(`Quota with name "${name}" already exists`);
    }

    const query = `
      INSERT INTO quota (name, quota_limit, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [name, quota_limit]);
    return rows[0];
  }

  // Update an existing quota with unique name validation
  static async updateQuota(id, name, quota_limit) {
    const existingQuota = await this.findByName(name, id);
    if (existingQuota) {
      throw new Error(`Quota with name "${name}" already exists`);
    }

    const query = `
      UPDATE quota
      SET name = $1, quota_limit = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [name, quota_limit, id]);
    return rows[0];
  }

  // Delete a quota by ID
  static async deleteQuota(id) {
    try {
      const query = `DELETE FROM quota WHERE id = $1 RETURNING *`;
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      if (error.code === '23503') {
        // Foreign key violation error code in PostgreSQL
        throw new Error('Terdapat services yang menggunakan data ini');
      }
      // console.log(error);
      throw error;
    }
  }
}

module.exports = Quota;
