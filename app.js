const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const { connect: dbConnect } = require('./config/database');
const { connectRedis } = require('./config/redis');
const errorHandler = require('./middleware/error');

// Import route files properly
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const homeRouter = require('./routes/home.routes');
const tenantRouter = require('./routes/tenant.routes');
const paymentRouter = require('./routes/payment.routes');

// Create express app
const app = express();

// Initialize application
const initializeApp = async () => {
  try {
    // Connect to database
    await dbConnect();
    
    // Connect to Redis
    await connectRedis();

    // Middleware
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Swagger documentation
    const swaggerDocument = require('./swagger.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Mount routers
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/homes', homeRouter);
    app.use('/api/tenants', tenantRouter);
    app.use('/api/payments', paymentRouter);

    // Health check
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK' });
    });

    // Error handler
    app.use(errorHandler);

    return app;
  } catch (err) {
    console.error('Failed to initialize application:', err);
    process.exit(1);
  }
};

// Export the initialization function
module.exports = initializeApp;