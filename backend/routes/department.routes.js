const express = require('express');
const router = express.Router();

const {
  getAllDepartments,
  createDepartment,
  addUserToDepartment,
  getUserDepartments,
  editDepartment,
  deleteDepartment,
  employeesList,
  allDepartments,
  employeeDepartments,
} = require('../controllers/department.controllers');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/all').get(isAuthenticatedUser, authorizedRoles('manager'), getAllDepartments);
router.route('/user').get(isAuthenticatedUser, authorizedRoles('manager'), getUserDepartments);
router.route('/create').post(isAuthenticatedUser, authorizedRoles('manager'), createDepartment);
router.route('/employees').get(isAuthenticatedUser, authorizedRoles('manager'), employeesList);
router
  .route('/alldepartemnts')
  .get(isAuthenticatedUser, authorizedRoles('manager'), allDepartments);
router
  .route('/employee/departments/:id')
  .get(isAuthenticatedUser, authorizedRoles('employee'), employeeDepartments);
router
  .route('/add/user/:id')
  .post(isAuthenticatedUser, authorizedRoles('manager'), addUserToDepartment);
router
  .route('/:id')
  .patch(isAuthenticatedUser, authorizedRoles('manager'), editDepartment)
  .delete(isAuthenticatedUser, authorizedRoles('manager'), deleteDepartment);

module.exports = router;
