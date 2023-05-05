const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

// setting up config file
dotenv.config({});
// dotenv.config({ path: 'backend/config/config.env' });

// Handle the uncaught exceptions like anything is not defined
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down server due to uncaught exception');
  process.exit(1);
});

// connecting to database
connectDatabase();

// Setting up clodinary config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle Unhandled Promise rejection
process.on('unhandledRejection', err => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down sever due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
