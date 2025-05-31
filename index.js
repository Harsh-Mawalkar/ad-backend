const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const adsRoutes = require('./routes/ads');
const websitesRoutes = require('./routes/websites');
const matchRoutes = require('./routes/match');
const simulator = require('./simulation/simulator');
const statsRoutes = require('./routes/stats');
const Match = require('./models/Match');

require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());

connectDB();

app.use('/ads', adsRoutes);
app.use('/websites', websitesRoutes);
app.use('/match-ads', matchRoutes);
app.use('/stats', statsRoutes);

app.get('/serve-ad', async (req, res) => {
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
  

simulator(); // Start simulation loop

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
