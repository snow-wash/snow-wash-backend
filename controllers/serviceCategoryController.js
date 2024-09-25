const ServicesCategory = require('../models/ServicesCategoryModel');
const baseResponse = require('../utils/response');

const servicesCategoryController = {
  // Get all service categories
  async getAllServicesCategories(req, res) {
    try {
      const categories = await ServicesCategory.getAll();
      res
        .status(200)
        .json(
          baseResponse(
            200,
            categories,
            'Services categories fetched successfully',
          ),
        );
    } catch (error) {
      console.error('Get All Services Categories Error:', error);
      res
        .status(500)
        .json(
          baseResponse(
            500,
            null,
            error.message || 'Error fetching services categories',
          ),
        );
    }
  },

  // Get a service category by ID
  async getServiceCategoryById(req, res) {
    const { id } = req.params;
    try {
      const category = await ServicesCategory.findById(id);
      if (!category) {
        return res
          .status(404)
          .json(baseResponse(404, null, 'Service category not found'));
      }
      res
        .status(200)
        .json(
          baseResponse(200, category, 'Service category fetched successfully'),
        );
    } catch (error) {
      console.error('Get Service Category By ID Error:', error);
      res
        .status(500)
        .json(
          baseResponse(
            500,
            null,
            error.message || 'Error fetching service category',
          ),
        );
    }
  },

  // Create a new service category
  async createServiceCategory(req, res) {
    const {
      name,
      service_id,
      minimum_load,
      load_amount,
      price,
      estimated_time,
    } = req.body;
    if (!name || !service_id) {
      return res
        .status(400)
        .json(baseResponse(400, null, 'Name and service_id are required'));
    }
    try {
      const newCategory = await ServicesCategory.create({
        name,
        service_id,
        minimum_load,
        load_amount,
        price,
        estimated_time,
      });
      res
        .status(201)
        .json(
          baseResponse(
            201,
            newCategory,
            'Service category created successfully',
          ),
        );
    } catch (error) {
      console.error('Create Service Category Error:', error);
      res
        .status(500)
        .json(
          baseResponse(
            500,
            null,
            error.message || 'Error creating service category',
          ),
        );
    }
  },

  // Update a service category by ID
  async updateServiceCategory(req, res) {
    const { id } = req.params;
    const {
      name,
      service_id,
      minimum_load,
      load_amount,
      price,
      estimated_time,
    } = req.body;
    try {
      const updatedCategory = await ServicesCategory.update(id, {
        name,
        service_id,
        minimum_load,
        load_amount,
        price,
        estimated_time,
      });
      if (!updatedCategory) {
        return res
          .status(404)
          .json(baseResponse(404, null, 'Service category not found'));
      }
      res
        .status(200)
        .json(
          baseResponse(
            200,
            updatedCategory,
            'Service category updated successfully',
          ),
        );
    } catch (error) {
      console.error('Update Service Category Error:', error);
      res
        .status(500)
        .json(
          baseResponse(
            500,
            null,
            error.message || 'Error updating service category',
          ),
        );
    }
  },

  // Delete a service category by ID
  async deleteServiceCategory(req, res) {
    const { id } = req.params;
    try {
      const deletedCategory = await ServicesCategory.delete(id);
      if (!deletedCategory) {
        return res
          .status(404)
          .json(baseResponse(404, null, 'Service category not found'));
      }
      res
        .status(200)
        .json(baseResponse(200, null, 'Service category deleted successfully'));
    } catch (error) {
      console.error('Delete Service Category Error:', error);
      res
        .status(500)
        .json(
          baseResponse(
            500,
            null,
            error.message || 'Error deleting service category',
          ),
        );
    }
  },
};

module.exports = servicesCategoryController;
