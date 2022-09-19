import DamProfileChart from './chart.js';
import Info from './info.js';

export default (req, res) => {
  // Check for required numeric query parameters
  const missing =
    Info &&
    Info.required_params &&
    Info.required_params.find((r) => isNaN(req.query[r]));
  if (missing) {
    res.status(400).send(`missing required parameter: ${missing}`);
    return;
  }

  const {
    pool,
    tail,
    inflow,
    outflow,
    surcharge,
    damBottom,
    damTop,
    gradientTop,
    gradientBottom,
  } = req.query;
  res.send(
    DamProfileChart({
      pool: pool,
      tail: tail,
      inflow: inflow,
      outflow: outflow,
      surcharge: surcharge,
      damBottom: damBottom,
      damTop: damTop,
      gradientBottom: gradientBottom,
      gradientTop: gradientTop,
    }).serialize()
  );
};
