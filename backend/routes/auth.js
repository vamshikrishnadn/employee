const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
} = require('../controllers/authController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').get(logout);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

router.route('/admin/users').get(isAuthenticatedUser, authorizedRoles('admin'), allUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizedRoles('admin'), getUserDetails);

module.exports = router;
