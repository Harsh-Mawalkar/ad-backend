const express = require('express');
const router = express.Router();
const Placement = require('../models/Placement');

// GET /stats - View all placements
router.get('/', async (req, res) => {
  const stats = await Placement.find();
  res.json(stats);
});
router.post('/match/:id/impression', async (req, res) => {
    try {
      const match = await Match.findByIdAndUpdate(
        req.params.id,
        { $inc: { impressions: 1 } },
        { new: true }
      );
      res.json(match);
    } catch (err) {
      res.status(500).json({ error: 'Failed to increment impression' });
    }
  });
  router.post('/match/:id/click', async (req, res) => {
    try {
      const match = await Match.findByIdAndUpdate(
        req.params.id,
        { $inc: { clicks: 1 } },
        { new: true }
      );
      res.json(match);
    } catch (err) {
      res.status(500).json({ error: 'Failed to increment click' });
    }
  });
  
  

module.exports = router;
