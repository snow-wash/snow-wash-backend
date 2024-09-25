const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, transactionController.getAllTransactions);
router.get('/:id', authMiddleware, transactionController.getTransactionById);
router.post('/', authMiddleware, transactionController.createTransaction);
router.put('/:id', authMiddleware, transactionController.updateTransaction);
router.delete('/:id', authMiddleware, transactionController.deleteTransaction);

module.exports = router;
