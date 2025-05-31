const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

router.get('/', async (req, res) => {
  const { websiteId, slotSize } = req.query;

  try {
    const match = await Match.findOne({ websiteId })
      .populate({
        path: 'adId',
        match: { size: slotSize }
      })
      .exec();

    if (!match || !match.adId) {
      return res.status(404).json({ message: 'No matched ad found with that slot size' });
    }

    // ✅ Corrected slot size check
    if (slotSize && match.adId.size !== slotSize) {
      return res.status(404).json({ message: 'Slot size mismatch' });
    }

    // ✅ Increment impression count
    match.impressions += 1;
    await match.save();

    const ad = match.adId;
    res.json({
      adText: ad.title || ad.adText, // Depending on your schema
      imageUrl: ad.imageUrl,
      targetUrl: ad.targetUrl || '#', // Fallback URL if not set
      matchId: match._id
    });
  } catch (error) {
    console.error('Serve ad error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
