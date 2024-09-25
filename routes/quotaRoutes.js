const express = require('express');
const router = express.Router();
const quotaController = require('../controllers/quotaController');
const authMiddleware = require('../middlewares/authMiddleware');
const authMiddlewareSuperadmin = require('../middlewares/authMiddlewareSupeadmin');

router.get('/', authMiddleware, quotaController.getAllQuotas);
router.get('/:id', authMiddleware, quotaController.getQuotaById);
router.post('/', authMiddlewareSuperadmin, quotaController.createQuota);
router.put('/:id', authMiddlewareSuperadmin, quotaController.updateQuota);
router.delete('/:id', authMiddlewareSuperadmin, quotaController.deleteQuota);

module.exports = router;
