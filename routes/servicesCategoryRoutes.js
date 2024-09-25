const express = require('express');
const servicesCategoryController = require('../controllers/serviceCategoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const authMiddlewareSuperadmin = require('../middlewares/authMiddlewareSupeadmin');
const router = express.Router();

// Get all service categories
router.get('/', authMiddleware, servicesCategoryController.getAllServicesCategories);

// Get a single service category by ID
router.get('/:id', authMiddleware, servicesCategoryController.getServiceCategoryById);

// Create a new service category
router.post('/', authMiddlewareSuperadmin, servicesCategoryController.createServiceCategory);

// Update a service category by ID
router.put('/:id', authMiddlewareSuperadmin, servicesCategoryController.updateServiceCategory);

// Delete a service category by ID
router.delete('/:id', authMiddlewareSuperadmin, servicesCategoryController.deleteServiceCategory);

module.exports = router;
