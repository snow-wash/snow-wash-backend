const pool = require('../config/db');

class Transaction {
  static async getAllTransactions() {
    const query = `SELECT * FROM transaction ORDER BY id ASC`;
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getTransactionById(id) {
    const query = `SELECT * FROM transaction WHERE id = $1`;
    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async createTransaction(transactionDetails) {
    const {
      customer_name,
      transaction_date,
      service_id,
      service_category_id,
      total_load_amount,
      total_used_quota,
      total_price,
      operation_start,
      operation_end,
      estimate_time,
      status,
    } = transactionDetails;

    const query = `
      INSERT INTO transaction (customer_name, transaction_date, service_id, service_category_id, total_load_amount, total_used_quota, total_price, operation_start, operation_end, estimate_time, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
      RETURNING *;
    `;
    try {
      const { rows } = await pool.query(query, [
        customer_name,
        transaction_date,
        service_id,
        service_category_id,
        total_load_amount,
        total_used_quota,
        total_price,
        operation_start,
        operation_end,
        estimate_time,
        status,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async updateTransaction(id, transactionDetails) {
    const {
      customer_name,
      transaction_date,
      service_id,
      service_category_id,
      total_load_amount,
      total_used_quota,
      total_price,
      operation_start,
      operation_end,
      estimate_time,
      status,
    } = transactionDetails;

    const query = `
      UPDATE transaction
      SET customer_name = $1, transaction_date = $2, service_id = $3, service_category_id = $4, total_load_amount = $5, total_used_quota = $6, total_price = $7, operation_start = $8, operation_end = $9, estimate_time = $10, status = $11, updated_at = NOW()
      WHERE id = $12
      RETURNING *;
    `;
    try {
      const { rows } = await pool.query(query, [
        customer_name,
        transaction_date,
        service_id,
        service_category_id,
        total_load_amount,
        total_used_quota,
        total_price,
        operation_start,
        operation_end,
        estimate_time,
        status,
        id,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async deleteTransaction(id) {
    const query = `DELETE FROM transaction WHERE id = $1 RETURNING *;`;
    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Transaction;
