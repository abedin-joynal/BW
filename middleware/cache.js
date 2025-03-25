const redisClient = require('../config/redis');

const cache = (key, ttl = 3600) => {
  return async (req, res, next) => {
    const cacheKey = key || req.originalUrl;
    
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
      
      res.sendResponse = res.json;
      res.json = (body) => {
        redisClient.setEx(cacheKey, ttl, JSON.stringify(body));
        res.sendResponse(body);
      };
      
      next();
    } catch (err) {
      next();
    }
  };
};

module.exports = cache;