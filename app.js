import express from 'express';

import AppInfo from './appinfo.js';
import DamProfileChart from './dam-profile-chart/handler.js';
import ExampleScatter from './example-scatter/handler.js';

const app = express();

// Publish Information on all routes
app.get('/', (req, res) => {
  res.send(AppInfo);
});

// Register Individual D3 Visualizations
app.get('/dam-profile-chart', DamProfileChart);
app.get('/example-scatter', ExampleScatter);

export default app;
