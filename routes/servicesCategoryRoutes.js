// src/routes/servicesCategoryRoutes.js
const express = require('express');
const servicesCategoryController = require('../controllers/serviceCategoryController');
const router = express.Router();

router.get('/', servicesCategoryController.getAllServicesCategories);

module.exports = router;
