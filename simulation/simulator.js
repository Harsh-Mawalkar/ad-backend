const Placement = require('../models/Placement');
const Ad = require('../models/Ad');

function getRandomProbability(min, max) {
  return Math.random() * (max - min) + min;
}

async function simulate() {
  const placements = await Placement.find();

  for (const placement of placements) {
    const ad = await Ad.findById(placement.adId);
    if (!ad || ad.budget <= 0) continue;

    const impressionsThisRound = Math.floor(Math.random() * 5 + 1); // 1-5
    const clickRate = getRandomProbability(0.02, 0.08); // 2%–8%
    const clicks = Math.floor(impressionsThisRound * clickRate);
    const cost = impressionsThisRound * ad.pricePerImpression;

    if (ad.budget - cost < 0) continue;

    // Update placement stats
    placement.impressions += impressionsThisRound;
    placement.clicks += clicks;
    placement.costSpent += cost;
    placement.CTR = placement.impressions > 0 ? (placement.clicks / placement.impressions) : 0;
    await placement.save();

    // Update ad budget
    ad.budget -= cost;
    if (ad.budget <= 0) {
      ad.status = 'completed';
    }
    await ad.save();
  }
}

module.exports = () => {
  setInterval(() => {
    simulate().then(() => console.log(`[SIM] Tick - delivery simulated`));
  }, 10000); // Run every 10 seconds
};
