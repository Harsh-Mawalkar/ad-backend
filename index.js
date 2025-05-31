const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const adsRoutes = require('./routes/ads');
const websitesRoutes = require('./routes/websites');
const matchRoutes = require('./routes/match');
const simulator = require('./simulation/simulator');
const statsRoutes = require('./routes/stats');
const serveAdRoute = require('./routes/serveAd');;
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
app.use('/serve-ad', serveAdRoute);


  

simulator(); // Start simulation loop

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
