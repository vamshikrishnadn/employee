const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const Department = require('../models/department.model');
const { updateRandomId } = require('../utils/updateRandomId');
const Users = require('../models/user.model');

exports.employeeDepartments = catchAsyncErrors(async (req, res, next) => {
  const departments = await Department.find({
    location: { $regex: /^a/, $options: 'i' },
    category: 'IT',
  }).populate('employeeID');

  res.status(200).json({
    success: true,
    payload: departments,
  });
});

exports.salesDepartments = catchAsyncErrors(async (req, res, next) => {
  const departments = await Department.find({
    category: 'Sales',
  }).populate({ path: 'employeeID', options: { sort: { name: -1 } } });

  res.status(200).json({
    success: true,
    payload: departments,
  });
});
