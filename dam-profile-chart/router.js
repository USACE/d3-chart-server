import express from 'express';
import DamProfileChart from './chart.js';
import Info from './info.js';

const router = express.Router();

// Information Endpoint
router.get('/', (req, res) => {
  res.send(Info);
});

// Render D3 SVG
router.get('/render', (req, res) => {
  // Check for required numeric query parameters
  const missing =
    Info &&
    Info.required_params &&
    Info.required_params.find((r) => isNaN(req.query[r]));
  if (missing) {
    res.status(400).send(`missing required parameter: ${missing}`);
    return;
  }

  const { pool, tail, inflow, outflow } = req.query;
  res.send(
    DamProfileChart({
      pool: pool,
      tail: tail,
      inflow: inflow,
      outflow: outflow,
    }).serialize()
  );
});

export default router;
