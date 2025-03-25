const tenantService = require('../services/tenant.service');
const { addTenantSchema, releaseTenantSchema, payRentSchema } = require('../validations/tenant.validation');
const logger = require('../utils/logger');

exports.addTenant = async (req, res, next) => {
  try {
    const { error, value } = addTenantSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const tenant = await tenantService.addTenant(req.params.unitId, value);
    logger.info(`Tenant added: ${tenant.id} to unit ${req.params.unitId}`);
    
    res.status(201).json(tenant);
  } catch (err) {
    next(err);
  }
};

exports.releaseTenant = async (req, res, next) => {
  try {
    const { error, value } = releaseTenantSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await tenantService.releaseTenant(req.params.tenantId, value);
    logger.info(`Tenant released: ${req.params.tenantId}`);
    
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.payRent = async (req, res, next) => {
  try {
    const { error, value } = payRentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const payment = await tenantService.payRent(req.params.tenantId, req.user.id, value);
    logger.info(`Rent paid: ${payment.id} by tenant ${req.params.tenantId}`);
    
    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
};

exports.generateRentSlip = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const slip = await tenantService.generateRentSlip(req.params.tenantId, parseInt(month), parseInt(year));
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=rent-slip-${month}-${year}.pdf`);
    res.send(slip);
  } catch (err) {
    next(err);
  }
};

exports.getTenantDetails = async (req, res, next) => {
  try {
    const tenant = await tenantService.getTenantDetails(req.params.tenantId);
    
    res.status(200).json(tenant);
  } catch (err) {
    next(err);
  }
};