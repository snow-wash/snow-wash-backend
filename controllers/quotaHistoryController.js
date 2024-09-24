const QuotaHistory = require('../models/quotaHistoryModel');
const baseResponse = require('../utils/response');

const quotaHistoryController = {
  async getAllQuotaHistory(req, res) {
    try {
      const quotaHistory = await QuotaHistory.getAllQuotaHistory();
      res
        .status(200)
        .json(
          baseResponse(200, quotaHistory, 'Quota history fetched successfully'),
        );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(baseResponse(500, null, 'Error fetching quota history'));
    }
  },

  async getQuotaHistoryById(req, res) {
    try {
      const id = req.params.id;
      const quotaHistory = await QuotaHistory.getQuotaHistoryById(id);
      if (quotaHistory) {
        res
          .status(200)
          .json(
            baseResponse(
              200,
              quotaHistory,
              'Quota history fetched successfully',
            ),
          );
      } else {
        res
          .status(404)
          .json(baseResponse(404, null, 'Quota history not found'));
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(baseResponse(500, null, 'Error fetching quota history'));
    }
  },

  async createQuotaHistory(req, res) {
    try {
      const newQuotaHistory = await QuotaHistory.createQuotaHistory(req.body);
      res
        .status(201)
        .json(
          baseResponse(
            201,
            newQuotaHistory,
            'Quota history created successfully',
          ),
        );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(baseResponse(500, null, 'Error creating quota history'));
    }
  },

  async updateQuotaHistory(req, res) {
    try {
      const id = req.params.id;
      const updatedQuotaHistory = await QuotaHistory.updateQuotaHistory(
        id,
        req.body,
      );
      res
        .status(200)
        .json(
          baseResponse(
            200,
            updatedQuotaHistory,
            'Quota history updated successfully',
          ),
        );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(baseResponse(500, null, 'Error updating quota history'));
    }
  },

  async deleteQuotaHistory(req, res) {
    try {
      const id = req.params.id;
      const deletedQuotaHistory = await QuotaHistory.deleteQuotaHistory(id);
      if (deletedQuotaHistory) {
        res
          .status(200)
          .json(
            baseResponse(
              200,
              deletedQuotaHistory,
              'Quota history deleted successfully',
            ),
          );
      } else {
        res
          .status(404)
          .json(baseResponse(404, null, 'Quota history not found'));
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(baseResponse(500, null, 'Error deleting quota history'));
    }
  },

  async getStartFromCurrentDate(req, res) {
    try {
      const quotaHistory = await QuotaHistory.getStartFromCurrentDate();
      res
        .status(200)
        .json(
          baseResponse(
            200,
            quotaHistory,
            'Quota history starting from current date fetched successfully',
          ),
        );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(baseResponse(500, null, 'Error fetching quota history'));
    }
  },
};

module.exports = quotaHistoryController;
