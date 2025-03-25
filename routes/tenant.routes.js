const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant.controller');
const { validate } = require('../middleware/auth');

/**
 * @swagger
 * /api/tenants:
 *   post:
 *     summary: Add a new tenant
 */
router.post('/', validate(['HOME_OWNER']), tenantController.addTenant);

/**
 * @swagger
 * /api/tenants/{tenantId}/pay:
 *   post:
 *     summary: Pay rent
 */
router.post('/:tenantId/pay', validate(['TENANT']), tenantController.payRent);

module.exports = router;