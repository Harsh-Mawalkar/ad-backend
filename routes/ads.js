const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');

// POST /ads - Register new ad
router.post('/', async (req, res) => {
  try {
    const ad = new Ad(req.body);
    await ad.save();
    res.status(201).json(ad);
  } catch (err) {
    res.status(500).json({ error: 'Error creating ad' });
  }
});

// GET /ads - Get all ads
router.get('/', async (req, res) => {
  const ads = await Ad.find();
  res.json(ads);
});

module.exports = router;
