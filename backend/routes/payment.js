const express = require('express');
const router = express.Router();

const { processPayment, sendStripApi } = require('../controllers/paymentControler');

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/payment/process').post(processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripApi);

module.exports = router;
