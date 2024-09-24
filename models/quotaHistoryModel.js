const pool = require('../config/db');

class QuotaHistory {
  // Get all quota history
  static async getAllQuotaHistory() {
    const query = `SELECT * FROM quota_history ORDER BY id ASC`;
    const { rows } = await pool.query(query);
    return rows;
  }

  // Get quota history by ID
  static async getQuotaHistoryById(id) {
    const query = `SELECT * FROM quota_history WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Create new quota history
  static async createQuotaHistory({
    date,
    limit_used,
    limit_remaining,
    quota_id,
    quota_name,
  }) {
    const query = `
      INSERT INTO quota_history (date, limit_used, limit_remaining, quota_id, quota_name, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [
      date,
      limit_used,
      limit_remaining,
      quota_id,
      quota_name,
    ]);
    return rows[0];
  }

  // Update quota history
  static async updateQuotaHistory(
    id,
    { date, limit_used, limit_remaining, quota_id, quota_name },
  ) {
    const query = `
      UPDATE quota_history
      SET date = $1, limit_used = $2, limit_remaining = $3, quota_id = $4, quota_name = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [
      date,
      limit_used,
      limit_remaining,
      quota_id,
      quota_name,
      id,
    ]);
    return rows[0];
  }

  // Delete quota history
  static async deleteQuotaHistory(id) {
    const query = `DELETE FROM quota_history WHERE id = $1 RETURNING *;`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  // Get quota history starting from the current date
  static async getStartFromCurrentDate() {
    const query = `SELECT * FROM quota_history WHERE date >= CURRENT_DATE ORDER BY date ASC;`;
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = QuotaHistory;
