const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  adId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true },
  websiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Website', required: true },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  matchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);