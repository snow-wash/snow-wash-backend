const express = require('express');
const router = express.Router();
const quotaHistoryController = require('../controllers/quotaHistoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const authMiddlewareSuperadmin = require('../middlewares/authMiddlewareSupeadmin');

router.get('/', authMiddleware, quotaHistoryController.getAllQuotaHistory);
router.get('/:id', authMiddleware, quotaHistoryController.getQuotaHistoryById);
router.post('/', authMiddlewareSuperadmin, quotaHistoryController.createQuotaHistory);
router.put('/:id', authMiddlewareSuperadmin, quotaHistoryController.updateQuotaHistory);
router.delete('/:id', authMiddlewareSuperadmin, quotaHistoryController.deleteQuotaHistory);
router.get('/current', authMiddleware, quotaHistoryController.getStartFromCurrentDate);

module.exports = router;
