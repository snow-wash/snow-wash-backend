const express = require('express');
const servicesCategoryController = require('../controllers/serviceCategoryController');
const router = express.Router();

// Get all service categories
router.get('/', servicesCategoryController.getAllServicesCategories);

// Get a single service category by ID
router.get('/:id', servicesCategoryController.getServiceCategoryById);

// Create a new service category
router.post('/', servicesCategoryController.createServiceCategory);

// Update a service category by ID
router.put('/:id', servicesCategoryController.updateServiceCategory);

// Delete a service category by ID
router.delete('/:id', servicesCategoryController.deleteServiceCategory);

module.exports = router;
