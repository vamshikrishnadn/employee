const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const Department = require('../models/department.model');
const { updateRandomId } = require('../utils/updateRandomId');

exports.getAllDepartments = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.query);
  const resPerPage = 5;
  const totalCount = await Department.countDocuments();
  const apiFeatures = new APIFeatures(Department.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const department = await apiFeatures.query;

  res.status(200).json({
    success: true,
    payload: {
      count: department.length,
      totalCount,
      department,
    },
  });
});

exports.createDepartment = catchAsyncErrors(async (req, res, next) => {
  const department = await Department.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, payload: department });
});

exports.addUserToDepartment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { employeeIds } = req.body;
  const department = await Department.findById(id);
  const allEmpIds = [...department.employeeID, ...employeeIds];
  const updateDepartments = await Department.findByIdAndUpdate(
    id,
    {
      employeeID: [...new Set(allEmpIds)],
    },
    {
      upsert: true,
      new: true,
    }
  );

  res.status(201).json({ success: true, payload: updateDepartments });
});
