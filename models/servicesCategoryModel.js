const pool = require('../config/db');

class ServicesCategoryModel {
  static async isCategoryNameExists(name, excludeId = null) {
    try {
      let query = `SELECT COUNT(*) FROM services_category WHERE name = $1`;
      const values = [name];
      if (excludeId) {
        query += ` AND id != $2`;
        values.push(excludeId);
      }
      const result = await pool.query(query, values);
      return result.rows[0].count > 0;
    } catch (error) {
      throw error;
    }
  }

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
          sc.service_id,
          s.name AS service_name 
        FROM 
          services_category sc
        JOIN 
          services s ON sc.service_id = s.id
        ORDER BY sc.id ASC
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

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
          sc.service_id,
          s.name AS service_name 
        FROM 
          services_category sc
        JOIN 
          services s ON sc.service_id = s.id
        WHERE 
          sc.id = $1
        ORDER BY sc.id ASC
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create({
    name,
    service_id,
    minimum_load,
    load_amount,
    price,
    estimated_time,
  }) {
    try {
      const nameExists = await this.isCategoryNameExists(name);
      if (nameExists) {
        throw new Error('Category name already exists');
      }

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

      const createdId = result.rows[0].id;
      return await this.findById(createdId);
    } catch (error) {
      throw error;
    }
  }

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

      return await this.findById(result.rows[0].id);
    } catch (error) {
      throw error;
    }
  }

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
