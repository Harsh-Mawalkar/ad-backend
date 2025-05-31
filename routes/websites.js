const express = require('express');
const router = express.Router();
const Website = require('../models/Website');

// POST /websites - Register new website
router.post('/', async (req, res) => {
    try {
      const {
        ownerId,
        websiteName,
        url,
        category,
        audience,
        adSlotSize,
        numSlots
      } = req.body;
  
      // Basic validation
      if (
        !ownerId ||
        !websiteName ||
        !url ||
        !category ||
        !audience ||
        !adSlotSize ||
        !numSlots
      ) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Create adSlots array based on numSlots and adSlotSize
      const adSlots = [];
      for (let i = 1; i <= Number(numSlots); i++) {
        adSlots.push({
          slotId: `slot${i}`,
          size: adSlotSize,
          minPrice: 0 // default price, adjust as needed
        });
      }
  
      const newWebsite = new Website({
        ownerId,
        websiteName,
        url,
        category,
        audience,
        adSlots,
        numSlots: Number(numSlots)
      });
      console.log("Website instance created:", newWebsite);
  
      await newWebsite.save();
  
      res.status(201).json(newWebsite); // Return the full saved document including _id
    } catch (err) {
      console.error('Error saving website:', err);
      res.status(500).json({ error: 'Failed to register website' });
    }
  });

// GET /websites - Get all websites
router.get('/', async (req, res) => {
  const sites = await Website.find();
  res.json(sites);
});

module.exports = router;
