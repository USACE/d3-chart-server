import express from 'express';

import AppInfo from './appinfo.js';
import DamProfileChart from './dam-profile-chart/handler.js';
import ExampleScatter from './example-scatter/handler.js';

const app = express();

// Lowercase all querystring parameters
// https://stackoverflow.com/questions/15521876/nodejs-express-is-it-possible-to-have-case-insensitive-querystring
app.use((req, res, next) => {
  for (var key in req.query)
  { 
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
});

// Publish Information on all routes
app.get('/', (req, res) => {
  res.send(AppInfo);
});

// Health Checks
app.get('/health', (req, res) => {
  res.send('healthy');
});

// Register Individual D3 Visualizations
app.get('/dam-profile-chart', DamProfileChart);
app.get('/example-scatter', ExampleScatter);

export default app;
