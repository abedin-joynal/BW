const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');
const { sendOtp } = require('../utils/helpers');
const logger = require('../utils/logger');

const register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
      isVerified: false
    }
  });
  
  // In production, you would send a real OTP
  const otp = sendOtp(user.phone);
  logger.info(`OTP for ${user.phone}: ${otp}`);
  
  return user;
};

const login = async ({ phone, password }) => {
  const user = await prisma.user.findUnique({ where: { phone } });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  
  if (!user.isVerified) {
    throw new Error('Account not verified');
  }
  
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  
  return { user, token };
};

module.exports = { register, login };