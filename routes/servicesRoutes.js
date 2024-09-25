// src/routes/servicesRoutes.js
const express = require('express');
const servicesController = require('../controllers/servicesController');
const authMiddleware = require('../middlewares/authMiddleware');
const authMiddlewareSuperadmin = require('../middlewares/authMiddlewareSupeadmin');

const router = express.Router();

// Get all services
router.get('/', authMiddleware, servicesController.getAllServices);

// Get a single service by ID
router.get('/:id', authMiddleware, servicesController.getServiceById);

// Create a new service
router.post('/', authMiddlewareSuperadmin, servicesController.createService);

// Update an existing service
router.put('/:id', authMiddlewareSuperadmin, servicesController.updateService);

// Delete a service
router.delete('/:id', authMiddlewareSuperadmin, servicesController.deleteService);

module.exports = router;
