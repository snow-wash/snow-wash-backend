const Transaction = require('../models/transactionModel');
const baseResponse = require('../utils/response');

const transactionController = {
  async getAllTransactions(req, res) {
    try {
      const transactions = await Transaction.getAllTransactions();
      res
        .status(200)
        .json(
          baseResponse(200, transactions, 'Transactions fetched successfully'),
        );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(
          baseResponse(
            500,
            null,
            `Error fetching transactions: ${error.message}`,
          ),
        );
    }
  },

  async getTransactionById(req, res) {
    try {
      const id = req.params.id;
      const transaction = await Transaction.getTransactionById(id);
      if (transaction) {
        res
          .status(200)
          .json(
            baseResponse(200, transaction, 'Transaction fetched successfully'),
          );
      } else {
        res.status(404).json(baseResponse(404, null, 'Transaction not found'));
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(
          baseResponse(
            500,
            null,
            `Error fetching transaction: ${error.message}`,
          ),
        );
    }
  },

  async createTransaction(req, res) {
    try {
      const newTransaction = await Transaction.createTransaction(req.body);
      res
        .status(201)
        .json(
          baseResponse(201, newTransaction, 'Transaction created successfully'),
        );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(
          baseResponse(
            500,
            null,
            `Error creating transaction: ${error.message}`,
          ),
        );
    }
  },

  async updateTransaction(req, res) {
    try {
      const id = req.params.id;
      const updatedTransaction = await Transaction.updateTransaction(
        id,
        req.body,
      );
      res
        .status(200)
        .json(
          baseResponse(
            200,
            updatedTransaction,
            'Transaction updated successfully',
          ),
        );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(
          baseResponse(
            500,
            null,
            `Error updating transaction: ${error.message}`,
          ),
        );
    }
  },

  async deleteTransaction(req, res) {
    try {
      const id = req.params.id;
      const deletedTransaction = await Transaction.deleteTransaction(id);
      if (deletedTransaction) {
        res
          .status(200)
          .json(
            baseResponse(
              200,
              deletedTransaction,
              'Transaction deleted successfully',
            ),
          );
      } else {
        res.status(404).json(baseResponse(404, null, 'Transaction not found'));
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(
          baseResponse(
            500,
            null,
            `Error deleting transaction: ${error.message}`,
          ),
        );
    }
  },
};

module.exports = transactionController;
