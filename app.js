import express from 'express';
import dotenv from 'dotenv';

import DamProfileChartRouter from './dam-profile-chart/router.js';
import ExampleScatterRouter from './example-scatter/router.js';

dotenv.config();

const app = express();

// Publish Information on all routes
const routes = [{ url: '/dam-profile-chart' }, { url: '/example-scatter' }];
app.get('/', (req, res) => {
  res.send(
    routes.map((r) => ({
      ...r,
      url: `${process.env.ROOT_URL}${r.url}`,
    }))
  );
});

// Register Individual D3 Visualizations
app.use('/dam-profile-chart', DamProfileChartRouter);
app.use('/example-scatter', ExampleScatterRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
