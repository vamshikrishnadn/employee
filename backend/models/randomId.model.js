const mongoose = require('mongoose');

const randomIdSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    default: 'EMP001',
  },
  mangerId: {
    type: String,
    default: 'MGR001',
  },
});

module.exports = mongoose.model('RandId', randomIdSchema);
