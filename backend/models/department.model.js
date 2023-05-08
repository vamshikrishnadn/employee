const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product name can not exceed 100 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please select category for product'],
    enum: {
      values: ['HR', 'IT', 'Sales', 'Product Manager', 'Marketing'],
      message: 'Please Select correct category for Product',
    },
  },
  salary: {
    type: Number,
    required: [true, 'Please enter salary amount'],
    trim: true,
    default: 0.0,
  },
  location: {
    type: String,
  },
  employeeID: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User',
      },
    ],
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Department', departmentSchema);
