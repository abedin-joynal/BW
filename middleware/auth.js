const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');
const logger = require('../utils/logger');

const validate = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      req.user = user;
      next();
    } catch (err) {
      logger.error(`Authentication error: ${err.message}`);
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

module.exports = { validate };