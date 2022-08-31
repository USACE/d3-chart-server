import Chart from './chart.js';

export default (req, res) => {
  const ChartInfo = {
    pointCount: isNaN(req.query['pointCount']) ? null : req.query['pointCount'],
  };
  res.send(Chart(ChartInfo).serialize());
};
