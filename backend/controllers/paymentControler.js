const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const stripe = require('stripe')(
  'sk_test_51IwoVoSChIjBTermJuDFwZwwET0hhuzPyjraShPfMAjyYAQVxEQkQBGagQGK7V73cOylw9YTEnQRQjb5cvva9mgw00hck26sUq'
);
// Process stripe payments
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  // const { paymentMethodId } = req.body;
  // const { amount } = req.body;
  // const { id } = req.user;

  console.log('valuessssssssssssssssssssss', req.body, req.body.amount);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'inr',
    description: req.body.description,
    metadata: { integration_check: 'accept_a_payment' },
  });

  console.log('paymentDetailsssssssssssss', paymentIntent.client_secret, paymentIntent);

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send api key
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
