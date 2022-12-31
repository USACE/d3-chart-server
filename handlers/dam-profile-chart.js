import { JSDOM } from 'jsdom';
import DamProfileChart from '../_charts/dam-profile-chart/dam-profile-chart.js';

const INFO = {
  name: 'Dam Profile Chart',
  description: `Dam Profile Chart Description`,
  required_params: ['pool', 'tail', 'inflow', 'outflow', 'damTop', 'damBottom'],
};

const handler = (req, res) => {
  // Check for required numeric query parameters
  const missing =
    INFO &&
    INFO.required_params &&
    INFO.required_params.find((r) => isNaN(req.query[r.toLowerCase()]));

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
    dambottom,
    damtop,
    gradientbottom,
    gradienttop,
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

  //////////////////////
  // Approximate the DOM
  //////////////////////
  const { document } = new JSDOM(
    `<svg preserveAspectRatio='xMinYMin meet' viewBox='0 0 1240 650'></svg>`
  ).window;

  const dom = document.querySelector('svg');

  DamProfileChart(
    {
      pool: pool,
      tail: tail,
      inflow: inflow,
      outflow: outflow,
      surcharge: surcharge,
      dambottom: dambottom,
      damtop: damtop,
      gradientBottom: gradientbottom,
      gradientTop: gradienttop,
      levels: validLevels,
    },
    dom
  );

  res.send(dom.outerHTML);
};

export { INFO, handler, handler as default };
