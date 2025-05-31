const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  slotId: String,
  size: String,
  minPrice: Number
});

const websiteSchema = new mongoose.Schema({
  ownerId: String,
  websiteName: String,
  url: String,
  category: String,
  audience: String,
  adSlots: [slotSchema],
  numSlots: Number
});

module.exports = mongoose.model('Website', websiteSchema);
