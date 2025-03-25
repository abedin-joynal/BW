const initializeApp = require('./app');
const logger = require('./utils/logger');
const PORT = process.env.PORT || 3000;

initializeApp()
  .then(app => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    logger.error('Failed to start server:', err);
    process.exit(1);
  });