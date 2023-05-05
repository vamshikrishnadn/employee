const RandIds = require('../models/randomId.model');
const ErrorHandler = require('./errorHandler');

const updateRandomId = async type => {
  const ids = await RandIds.findByIdAndUpdate('645513b9b0e4c4a2203df370', {
    $inc: { [type]: 1 },
  });
  if (!ids) {
    throw new ErrorHandler('Id not found', 400);
  }
  return ids;
};

module.exports = {
  updateRandomId,
};
