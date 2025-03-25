const redis = require('redis');
const logger = require('../utils/logger');

// Create Redis client without immediate connection
const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => {
  logger.error(`Redis error: ${err}`);
});

// Modified connect function to prevent stack overflow
const connectRedis = async () => {
  try {
    await client.connect();
    logger.info('Connected to Redis');
    return client;
  } catch (err) {
    logger.error(`Redis connection error: ${err}`);
    process.exit(1);
  }
};

module.exports = {
  client,
  connectRedis
};