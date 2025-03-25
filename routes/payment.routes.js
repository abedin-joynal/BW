const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { validate } = require('../middleware/auth');

/**
 * @swagger
 * /api/payments/withdraw:
 *   post:
 *     summary: Withdraw funds
 */
router.post('/withdraw', validate(['HOME_OWNER']), paymentController.withdraw);

/**
 * @swagger
 * /api/payments/history:
 *   get:
 *     summary: Get payment history
 */
router.get('/history', validate(['HOME_OWNER', 'TENANT']), paymentController.getPaymentHistory);

module.exports = router;