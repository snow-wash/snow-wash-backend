const express = require('express');
const router = express.Router();
const quotaController = require('../controllers/quotaController');

router.get('/', quotaController.getAllQuotas);
router.get('/:id', quotaController.getQuotaById);
router.post('/', quotaController.createQuota);
router.put('/:id', quotaController.updateQuota);
router.delete('/:id', quotaController.deleteQuota);

module.exports = router;
