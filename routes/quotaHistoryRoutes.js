const express = require('express');
const router = express.Router();
const quotaHistoryController = require('../controllers/quotaHistoryController');

router.get('/', quotaHistoryController.getAllQuotaHistory);
router.get('/:id', quotaHistoryController.getQuotaHistoryById);
router.post('/', quotaHistoryController.createQuotaHistory);
router.put('/:id', quotaHistoryController.updateQuotaHistory);
router.delete('/:id', quotaHistoryController.deleteQuotaHistory);
router.get('/current', quotaHistoryController.getStartFromCurrentDate);

module.exports = router;
