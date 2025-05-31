const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

router.get('/', async (req, res) => {
    const { websiteId, slotSize } = req.query;
  
    try {
      const match = await Match.findOne({ websiteId })
        .populate('adId')
        .exec();
  
      if (!match) {
        return res.status(404).json({ message: 'No matched ad found' });
      }
  
      // Optional: check slotSize match
      if (slotSize && match.adId.slotSize !== slotSize) {
        return res.status(404).json({ message: 'Slot size mismatch' });
      }
  
      // Increment impression
      match.impressions += 1;
      await match.save();
  
      const ad = match.adId;
      res.json({
        adText: ad.adText,
        imageUrl: ad.imageUrl,
        targetUrl: ad.targetUrl,
        matchId: match._id
      });
    } catch (error) {
      console.error('Serve ad error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;