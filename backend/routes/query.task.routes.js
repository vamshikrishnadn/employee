const express = require('express');
const router = express.Router();

const { employeeDepartments, salesDepartments } = require('../controllers/query.task.controller');

router.route('/employee/department').get(employeeDepartments);
router.route('/employee/sales').get(salesDepartments);

module.exports = router;
