const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
  adId: String,
  slotId: String,
  siteId: String,
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  CTR: { type: Number, default: 0 },
  costSpent: { type: Number, default: 0 }
});

module.exports = mongoose.model('Placement', placementSchema);
