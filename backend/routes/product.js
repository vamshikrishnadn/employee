const express = require('express');
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/admin/product/new').post(isAuthenticatedUser, authorizedRoles('admin'), newProduct);
router.route('/product/:id').get(getSingleProduct);
router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

router.route('/review/new').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
router.route('/review').delete(isAuthenticatedUser, deleteReview);

module.exports = router;
