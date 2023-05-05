const express = require('express');
const router = express.Router();

const {
  getAllDepartments,
  createDepartment,
  addUserToDepartment,
} = require('../controllers/department.controllers');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/all').get(isAuthenticatedUser, authorizedRoles('manager'), getAllDepartments);
router.route('/create').post(isAuthenticatedUser, authorizedRoles('manager'), createDepartment);
router
  .route('/add/user/:id')
  .post(isAuthenticatedUser, authorizedRoles('manager'), addUserToDepartment);

module.exports = router;
