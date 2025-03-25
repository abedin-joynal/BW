const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

const prisma = new PrismaClient();

const connect = async () => {
  try {
    await prisma.$connect();
    logger.info('Connected to database');
  } catch (err) {
    logger.error(`Database connection error: ${err}`);
    process.exit(1);
  }
};

module.exports = { prisma, connect };