const Quota = require('../models/quotaModel');
const baseResponse = require('../utils/response');

const quotaController = {
  // Fetch all quotas
  async getAllQuotas(req, res) {
    try {
      const quotas = await Quota.getAllQuotas();
      res
        .status(200)
        .json(baseResponse(200, quotas, 'Quotas fetched successfully'));
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(
          baseResponse(500, null, error.message || 'Error fetching quotas'),
        );
    }
  },

  // Fetch a specific quota by ID
  async getQuotaById(req, res) {
    try {
      const id = req.params.id;
      const quota = await Quota.getQuotaById(id);
      if (quota) {
        res
          .status(200)
          .json(baseResponse(200, quota, 'Quota fetched successfully'));
      } else {
        res.status(404).json(baseResponse(404, null, 'Quota not found'));
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(baseResponse(500, null, error.message || 'Error fetching quota'));
    }
  },

  // Create a new quota
  async createQuota(req, res) {
    try {
      const { name, quota_limit } = req.body;
      const newQuota = await Quota.createQuota(name, quota_limit);
      res
        .status(201)
        .json(baseResponse(201, newQuota, 'Quota created successfully'));
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(baseResponse(500, null, error.message || 'Error creating quota'));
    }
  },

  // Update an existing quota by ID
  async updateQuota(req, res) {
    try {
      const id = req.params.id;
      const { name, quota_limit } = req.body;
      const updatedQuota = await Quota.updateQuota(id, name, quota_limit);
      if (updatedQuota) {
        res
          .status(200)
          .json(baseResponse(200, updatedQuota, 'Quota updated successfully'));
      } else {
        res.status(404).json(baseResponse(404, null, 'Quota not found'));
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(baseResponse(500, null, error.message || 'Error updating quota'));
    }
  },

  // Delete a quota by ID
  async deleteQuota(req, res) {
    try {
      const id = req.params.id;
      const deletedQuota = await Quota.deleteQuota(id);
      if (deletedQuota) {
        res
          .status(200)
          .json(baseResponse(200, deletedQuota, 'Quota deleted successfully'));
      } else {
        res.status(404).json(baseResponse(404, null, 'Quota not found'));
      }
    } catch (error) {
      console.error('error 2', error);
      res
        .status(500)
        .json(baseResponse(500, null, error.message || 'Error deleting quota'));
    }
  },
};

module.exports = quotaController;
