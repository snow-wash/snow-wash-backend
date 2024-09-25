// src/routes/servicesRoutes.js
const express = require('express');
const servicesController = require('../controllers/servicesController');

const router = express.Router();

// Get all services
router.get('/', servicesController.getAllServices);

// Get a single service by ID
router.get('/:id', servicesController.getServiceById);

// Create a new service
router.post('/', servicesController.createService);

// Update an existing service
router.put('/:id', servicesController.updateService);

// Delete a service
router.delete('/:id', servicesController.deleteService);

module.exports = router;
