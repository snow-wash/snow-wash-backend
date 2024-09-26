const pool = require('../config/db');

class Transaction {
  static async getAllTransactions() {
    // Modify the query to join with services and services_category tables
    const query = `
      SELECT 
        t.*, 
        s.name AS service_name, 
        sc.name AS service_category_name, 
        sc.estimated_time 
      FROM 
        transaction t
      JOIN 
        services s ON t.service_id = s.id
      JOIN 
        services_category sc ON t.service_category_id = sc.id
      ORDER BY 
        t.id ASC;
    `;
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getTransactionById(id) {
    // Modify the query to join with services and services_category tables
    const query = `
      SELECT 
        t.*, 
        s.name AS service_name, 
        sc.name AS service_category_name, 
        sc.estimated_time 
      FROM 
        transaction t
      JOIN 
        services s ON t.service_id = s.id
      JOIN 
        services_category sc ON t.service_category_id = sc.id
      WHERE 
        t.id = $1;
    `;
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
      estimated_time,
      status,
    } = transactionDetails;

    const query = `
      INSERT INTO transaction (customer_name, transaction_date, service_id, service_category_id, total_load_amount, total_used_quota, total_price, operation_start, operation_end, estimated_time, status, created_at, updated_at)
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
        estimated_time,
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
      estimated_time,
      status,
    } = transactionDetails;

    const query = `
      UPDATE transaction
      SET customer_name = $1, transaction_date = $2, service_id = $3, service_category_id = $4, total_load_amount = $5, total_used_quota = $6, total_price = $7, operation_start = $8, operation_end = $9, estimated_time = $10, status = $11, updated_at = NOW()
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
        estimated_time,
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
