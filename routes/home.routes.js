const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');
const { validate } = require('../middleware/auth');

/**
 * @swagger
 * /api/homes:
 *   post:
 *     summary: Create a new home
 */
router.post('/', validate(['HOME_OWNER']), homeController.createHome);

/**
 * @swagger
 * /api/homes/{homeId}/towers:
 *   post:
 *     summary: Add a tower to a home
 */
router.post('/:homeId/towers', validate(['HOME_OWNER']), homeController.addTower);

module.exports = router;