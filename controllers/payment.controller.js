const paymentService = require('../services/payment.service');
const { withdrawSchema, addBankAccountSchema } = require('../validations/payment.validation');
const logger = require('../utils/logger');

exports.withdraw = async (req, res, next) => {
  try {
    const { error, value } = withdrawSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const transaction = await paymentService.withdraw(req.user.id, value);
    logger.info(`Withdrawal processed: ${transaction.id} for user ${req.user.id}`);
    
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
};

exports.addBankAccount = async (req, res, next) => {
  try {
    const { error, value } = addBankAccountSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const bankAccount = await paymentService.addBankAccount(req.user.id, value);
    logger.info(`Bank account added: ${bankAccount.id} for user ${req.user.id}`);
    
    res.status(201).json(bankAccount);
  } catch (err) {
    next(err);
  }
};

exports.getPaymentHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const history = await paymentService.getPaymentHistory(req.user.id, parseInt(page), parseInt(limit));
    
    res.status(200).json(history);
  } catch (err) {
    next(err);
  }
};

exports.getBalance = async (req, res, next) => {
  try {
    const balance = await paymentService.getBalance(req.user.id);
    
    res.status(200).json({ balance });
  } catch (err) {
    next(err);
  }
};