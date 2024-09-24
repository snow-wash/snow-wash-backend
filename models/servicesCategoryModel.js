// src/models/ServicesCategoryModel.js
const pool = require('../config/db');

class ServicesCategoryModel {
  // Get all service categories with related service name
  static async getAll() {
    try {
      const query = `
        SELECT 
          sc.id, 
          sc.name AS category_name, 
          sc.minimum_load, 
          sc.load_amount, 
          sc.price, 
          sc.estimated_time, 
          s.name AS service_name 
        FROM 
          services_category sc
        JOIN 
          services s ON sc.service_id = s.id
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Find service category by ID
  static async findById(id) {
    try {
      const query = `
        SELECT 
          sc.id, 
          sc.name AS category_name, 
          sc.minimum_load, 
          sc.load_amount, 
          sc.price, 
          sc.estimated_time, 
          s.name AS service_name 
        FROM 
          services_category sc
        JOIN 
          services s ON sc.service_id = s.id
        WHERE 
          sc.id = $1
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create a new service category
  static async create({
    name,
    service_id,
    minimum_load,
    load_amount,
    price,
    estimated_time,
  }) {
    try {
      const query = `
        INSERT INTO services_category 
          (name, service_id, minimum_load, load_amount, price, estimated_time) 
        VALUES 
          ($1, $2, $3, $4, $5, $6) 
        RETURNING *
      `;
      const result = await pool.query(query, [
        name,
        service_id,
        minimum_load,
        load_amount,
        price,
        estimated_time,
      ]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update an existing service category
  static async update(
    id,
    { name, service_id, minimum_load, load_amount, price, estimated_time },
  ) {
    try {
      const query = `
        UPDATE services_category 
        SET 
          name = $1, 
          service_id = $2, 
          minimum_load = $3, 
          load_amount = $4, 
          price = $5, 
          estimated_time = $6, 
          updated_at = NOW() 
        WHERE id = $7 
        RETURNING *
      `;
      const result = await pool.query(query, [
        name,
        service_id,
        minimum_load,
        load_amount,
        price,
        estimated_time,
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete a service category
  static async delete(id) {
    try {
      const query = 'DELETE FROM services_category WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ServicesCategoryModel;
