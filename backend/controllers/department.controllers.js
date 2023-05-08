const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const Department = require('../models/department.model');
const { updateRandomId } = require('../utils/updateRandomId');
const Users = require('../models/user.model');

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

exports.getUserDepartments = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.query);
  const resPerPage = 5;
  const apiFeatures = new APIFeatures(
    Department.find({ createdBy: req.user._id }).populate('employeeID'),
    req.query
  )
    .search()
    .filter()
    .pagination(resPerPage);

  const department = await apiFeatures.query;
  const count = await Department.find({ createdBy: req.user._id }).count();

  res.status(200).json({
    success: true,
    payload: {
      count,
      department,
    },
  });
});

exports.allDepartments = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.query);

  const departments = await Department.find({ createdBy: req.user._id });

  res.status(200).json({
    success: true,
    payload: departments,
  });
});

exports.employeeDepartments = catchAsyncErrors(async (req, res, next) => {
  const departments = await Department.find({ employeeID: { $in: req.params.id } });

  res.status(200).json({
    success: true,
    payload: departments,
  });
});

exports.employeesList = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 5;

  const apiFeatures = new APIFeatures(Users.find({ role: 'employee' }), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const employees = await apiFeatures.query;
  const count = await Users.find({ role: 'employee' }).count();

  res.status(200).json({
    success: true,
    payload: {
      count,
      employees,
    },
  });

  // const employees = await Users.find({ role: 'employee' });

  // res.status(201).json({ success: true, payload: employees });
});

exports.createDepartment = catchAsyncErrors(async (req, res, next) => {
  const department = await Department.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, payload: department });
});

exports.editDepartment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const department = await Department.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({ success: true, payload: department });
});

exports.deleteDepartment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  await Department.findByIdAndDelete(id);

  res.status(201).json({ success: true, payload: 'success' });
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
