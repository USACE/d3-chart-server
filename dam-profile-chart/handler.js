import DamProfileChart from './chart.js';
import Info from './info.js';

export default (req, res) => {
  // Check for required numeric query parameters
  const missing =
    Info &&
    Info.required_params &&
    Info.required_params.find((r) => isNaN(req.query[r.toLowerCase()]));

  if (missing) {
    res
      .status(400)
      .send(`missing required parameter or incorrect input: ${missing}`);
    return;
  }

  // note; query parameters all returned as lowercase keys
  // case switched in destructure to avoid changing additiional code
  // and variables in function DamProfileChart
  const {
    pool,
    tail,
    inflow,
    outflow,
    surcharge,
    dambottom: damBottom,
    damtop: damTop,
    gradientbottom: gradientBottom,
    gradienttop: gradientTop,
    level = [],
  } = req.query;

  // level may be a single &level=<level-name>,<value> or may include multiples (i.e. &level=name1,15&level=name2,10)
  // In the case of multiples, the values will be combined into an array per standard querystring parsing (https://nodejs.org/api/querystring.html).
  const validLevels = (Array.isArray(level) ? level : [level]).map((v) => {
    let _levelValues = v.split(',');
    if (_levelValues.length === 2) {
      return { name: _levelValues[0], value: _levelValues[1] };
    }
  });

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
      levels: validLevels,
    }).serialize()
  );
};
