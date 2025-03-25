const Joi = require('joi');

const registerSchema = Joi.object({
  phone: Joi.string().pattern(/^01[3-9]\d{8}$/).required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().required(),
  email: Joi.string().email(),
  role: Joi.string().valid('ADMIN', 'HOME_OWNER', 'TENANT').required(),
  nidNumber: Joi.string(),
  address: Joi.string()
});

const loginSchema = Joi.object({
  phone: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };