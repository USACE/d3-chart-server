import express from 'express';

import Chart from './chart.js';
import Info from './info.js';

const router = express.Router();

// Information Endpoint
router.get('/', (req, res) => {
  res.send(Info);
});

// Render D3 SVG
router.get('/render', (req, res) => {
  const ChartInfo = {
    pointCount: isNaN(req.query['pointCount']) ? null : req.query['pointCount'],
  };
  res.send(Chart(ChartInfo).serialize());
});

export default router;
