const express = require('express');
const router = express.Router();
const Placement = require('../models/Placement');

// GET /stats - View all placements
router.get('/', async (req, res) => {
  const stats = await Placement.find();
  res.json(stats);
});

module.exports = router;
