const { prisma } = require('../config/database');
const logger = require('../utils/logger');

const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        phone: true,
        email: true,
        fullName: true,
        role: true,
        balance: true
      }
    });
    
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile
};