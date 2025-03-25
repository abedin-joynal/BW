const authService = require('../services/auth.service');
const { loginSchema, registerSchema } = require('../validations/auth.validation');
const logger = require('../utils/logger');

exports.register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await authService.register(value);
    logger.info(`User registered: ${user.id}`);
    
    res.status(201).json({
      id: user.id,
      phone: user.phone,
      role: user.role,
      message: 'Registration successful. Please verify your account.'
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { user, token } = await authService.login(value);
    logger.info(`User logged in: ${user.id}`);
    
    res.status(200).json({
      id: user.id,
      phone: user.phone,
      role: user.role,
      token,
      message: 'Login successful'
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    const user = await authService.verifyOtp(phone, otp);
    
    res.status(200).json({
      id: user.id,
      phone: user.phone,
      isVerified: user.isVerified,
      message: 'Account verified successfully'
    });
  } catch (err) {
    next(err);
  }
};