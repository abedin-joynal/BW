const generateRentSlip = (tenant, payment) => {
    // This would be implemented with a PDF generation library like pdfkit
    return {
      tenantName: tenant.user.fullName,
      unitNumber: tenant.unit.number,
      amount: payment.amount,
      month: payment.month,
      year: payment.year,
      paymentDate: payment.createdAt,
      transactionId: payment.id
    };
  };
  
  const sendOtp = (phone) => {
    // Implementation would depend on SMS gateway
    return '123456'; // Mock OTP for development
  };
  
  module.exports = { generateRentSlip, sendOtp };