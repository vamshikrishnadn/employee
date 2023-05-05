const express = require('express');
const router = express.Router();
const RandId = require('../models/randomId.model');

router.route('/create').post(async (req, res) => {
  const randId = await RandId.create({});
  res.status(200).send({
    success: true,
    payload: randId,
  });
});

router.route('/get').post(async (req, res) => {
  const randId = await RandId.find({});
  res.status(200).send({
    success: true,
    payload: randId,
  });
});

module.exports = router;
