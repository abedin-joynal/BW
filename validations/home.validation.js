const Joi = require('joi');

const createHomeSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required()
});

const addTowerSchema = Joi.object({
  name: Joi.string().required()
});

const addFloorSchema = Joi.object({
  number: Joi.number().required(),
  type: Joi.string().valid('RESIDENTIAL', 'PARKING', 'MARKET').required()
});

const addUnitSchema = Joi.object({
  number: Joi.string().required(),
  type: Joi.string().valid('RESIDENTIAL', 'PARKING', 'MARKET').required(),
  monthlyRent: Joi.number().positive().required(),
  advanceMonths: Joi.number().integer().min(1).required()
});

module.exports = {
  createHomeSchema,
  addTowerSchema,
  addFloorSchema,
  addUnitSchema
};