const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

// Import all routes
const auth = require('./routes/auth.routes');
const department = require('./routes/department.routes');
const randomId = require('./routes/randomId.routes');
const products = require('./routes/product');
const order = require('./routes/order');
const payment = require('./routes/payment');
const errorMiddleware = require('./middlewares/errors');
dotenv.config({});

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());

// routes
app.use('/v1/auth', auth);
app.use('/v1/department', department);
app.use('/v1/randId', randomId);
app.use('/v1/v1', products);
app.use('/v1/v1', order);
app.use('/v1/v1', payment);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
