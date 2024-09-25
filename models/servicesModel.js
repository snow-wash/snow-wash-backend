const pool = require('../config/db');

class ServicesModel {
  // Get all services, ordered by ID
  static async getAll() {
    try {
      const query = 'SELECT * FROM services ORDER BY id ASC';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Find service by ID
  static async findById(id) {
    try {
      const query = 'SELECT * FROM services WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Check if a service name already exists, excluding a specific ID
  static async findByName(name, excludeId = null) {
    try {
      let query = 'SELECT * FROM services WHERE name = $1';
      const values = [name];
      if (excludeId) {
        query += ' AND id != $2';
        values.push(excludeId);
      }
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create a new service with unique name validation
  static async create({ name, quota_id }) {
    try {
      const existingService = await this.findByName(name);
      if (existingService) {
        throw new Error(`Service with name "${name}" already exists`);
      }

      const query = `
        INSERT INTO services (name, quota_id) 
        VALUES ($1, $2) 
        RETURNING *
      `;
      const result = await pool.query(query, [name, quota_id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update an existing service with unique name validation
  static async update(id, { name, quota_id }) {
    try {
      const query = `
        UPDATE services 
        SET name = $1, quota_id = $2, updated_at = NOW() 
        WHERE id = $3 
        RETURNING *
      `;
      const result = await pool.query(query, [name, quota_id, id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete a service
  static async delete(id) {
    try {
      const query = 'DELETE FROM services WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ServicesModel;
