const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');
const Website = require('../models/Website');
const Match = require('../models/Match');

router.post('/', async (req, res) => {
  try {
    const ads = await Ad.find();
    const websites = await Website.find();

    const matches = [];

    for (let ad of ads) {
      for (let site of websites) {
        const categoryMatch = ad.category === site.category;
        const audienceMatch = ad.audience === site.audience;
        const sizeMatch = ad.slotSize === site.adSlotSize;

        if (categoryMatch && audienceMatch && sizeMatch) {
          const existingMatch = await Match.findOne({
            adId: ad._id,
            websiteId: site._id
          });

          if (!existingMatch) {
            const newMatch = new Match({
              adId: ad._id,
              websiteId: site._id
            });
            await newMatch.save();
            matches.push(newMatch);
          }
        }
      }
    }

    res.status(200).json({ message: 'Matching complete', matches });
  } catch (err) {
    console.error('Matching error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
