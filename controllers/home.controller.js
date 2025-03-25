const homeService = require('../services/home.service');
const { createHomeSchema, addTowerSchema, addFloorSchema, addUnitSchema } = require('../validations/home.validation');
const logger = require('../utils/logger');

exports.createHome = async (req, res, next) => {
  try {
    const { error, value } = createHomeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const home = await homeService.createHome(req.user.id, value);
    logger.info(`Home created: ${home.id} by user ${req.user.id}`);
    
    res.status(201).json(home);
  } catch (err) {
    next(err);
  }
};

exports.addTower = async (req, res, next) => {
  try {
    const { error, value } = addTowerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const tower = await homeService.addTower(req.params.homeId, value);
    logger.info(`Tower added: ${tower.id} to home ${req.params.homeId}`);
    
    res.status(201).json(tower);
  } catch (err) {
    next(err);
  }
};

exports.addFloor = async (req, res, next) => {
  try {
    const { error, value } = addFloorSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const floor = await homeService.addFloor(req.params.towerId, value);
    logger.info(`Floor added: ${floor.id} to tower ${req.params.towerId}`);
    
    res.status(201).json(floor);
  } catch (err) {
    next(err);
  }
};

exports.addUnit = async (req, res, next) => {
  try {
    const { error, value } = addUnitSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const unit = await homeService.addUnit(req.params.floorId, value);
    logger.info(`Unit added: ${unit.id} to floor ${req.params.floorId}`);
    
    res.status(201).json(unit);
  } catch (err) {
    next(err);
  }
};

exports.getHomeDetails = async (req, res, next) => {
  try {
    const home = await homeService.getHomeDetails(req.params.homeId);
    
    res.status(200).json(home);
  } catch (err) {
    next(err);
  }
};