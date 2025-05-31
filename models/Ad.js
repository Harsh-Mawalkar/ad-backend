const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  advertiserId: String,
  title: String,
  imageUrl: String,
  category: String,
  audience: String,
  budget: Number,
  pricePerImpression: Number,
  size: String,
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Ad', adSchema);
