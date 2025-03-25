const { prisma } = require('../config/database');
const logger = require('../utils/logger');

const addTenant = async (unitId, tenantData) => {
  return await prisma.$transaction(async (tx) => {
    // Check if unit exists and is available
    const unit = await tx.unit.findUnique({
      where: { id: unitId },
      include: { floor: true }
    });
    
    if (!unit) {
      throw new Error('Unit not found');
    }
    
    if (unit.isOccupied) {
      throw new Error('Unit is already occupied');
    }
    
    // Find or create user by phone
    let user = await tx.user.findUnique({
      where: { phone: tenantData.phone }
    });
    
    if (!user) {
      user = await tx.user.create({
        data: {
          phone: tenantData.phone,
          fullName: tenantData.phone, // Temporary, should be updated
          role: 'TENANT',
          password: 'temporary', // Should be reset
          isVerified: true
        }
      });
    }
    
    // Create tenant record
    const tenant = await tx.tenant.create({
      data: {
        userId: user.id,
        homeId: unit.floor.tower.homeId,
        unitId: unit.id,
        startDate: new Date(tenantData.startDate),
        agreement: tenantData.agreement,
        noticePeriod: tenantData.noticePeriod || 30
      }
    });
    
    // Mark unit as occupied
    await tx.unit.update({
      where: { id: unitId },
      data: { isOccupied: true }
    });
    
    return tenant;
  });
};

module.exports = { addTenant };