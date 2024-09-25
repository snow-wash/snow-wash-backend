const Services = require('../models/servicesModel');
const baseResponse = require('../utils/response');

const servicesController = {
  // Get all services
  async getAllServices(req, res) {
    try {
      const services = await Services.getAll();
      res
        .status(200)
        .json(baseResponse(200, services, 'Services fetched successfully'));
    } catch (error) {
      console.error('Get All Services Error:', error);
      res
        .status(500)
        .json(
          baseResponse(500, null, error.message || 'Error fetching services'),
        );
    }
  },

  // Get service by ID
  async getServiceById(req, res) {
    const { id } = req.params;
    try {
      const service = await Services.findById(id);
      if (!service) {
        return res
          .status(404)
          .json(baseResponse(404, null, 'Service not found'));
      }
      res
        .status(200)
        .json(baseResponse(200, service, 'Service fetched successfully'));
    } catch (error) {
      console.error('Get Service By ID Error:', error);
      res
        .status(500)
        .json(
          baseResponse(500, null, error.message || 'Error fetching service'),
        );
    }
  },

  // Create a new service
  async createService(req, res) {
    const { name, quota_id } = req.body;
    if (!name || !quota_id) {
      return res
        .status(400)
        .json(baseResponse(400, null, 'Name and quota_id are required'));
    }
    try {
      const newService = await Services.create({ name, quota_id });
      res
        .status(201)
        .json(baseResponse(201, newService, 'Service created successfully'));
    } catch (error) {
      console.error('Create Service Error:', error);
      res
        .status(500)
        .json(
          baseResponse(500, null, error.message || 'Error creating service'),
        );
    }
  },

  // Update a service by ID
  async updateService(req, res) {
    const { id } = req.params;
    const { name, quota_id } = req.body;
    try {
      const updatedService = await Services.update(id, { name, quota_id });
      if (!updatedService) {
        return res
          .status(404)
          .json(baseResponse(404, null, 'Service not found'));
      }
      res
        .status(200)
        .json(
          baseResponse(200, updatedService, 'Service updated successfully'),
        );
    } catch (error) {
      console.error('Update Service Error:', error);
      res
        .status(500)
        .json(
          baseResponse(500, null, error.message || 'Error updating service'),
        );
    }
  },

  // Delete a service by ID
  async deleteService(req, res) {
    const { id } = req.params;
    try {
      const deletedService = await Services.delete(id);
      if (!deletedService) {
        return res
          .status(404)
          .json(baseResponse(404, null, 'Service not found'));
      }
      res
        .status(200)
        .json(baseResponse(200, null, 'Service deleted successfully'));
    } catch (error) {
      console.error('Delete Service Error:', error);
      res
        .status(500)
        .json(
          baseResponse(500, null, error.message || 'Error deleting service'),
        );
    }
  },
};

module.exports = servicesController;
