import { JSDOM } from 'jsdom';
import Chart from '../_charts/example-scatter/example-scatter.js'

const INFO = {
  name: 'Basic Scatter Plot',
  description: `Example plot to demonstrate how to add a chart. Chart is based on code from https://d3-graph-gallery.com/graph/scatter_basic.html. Chart accepts query parameter ?pointCount=100 to control number of points in the scatter plot`,
  required_params: null,
};

const handler = (req, res) => {
  const ChartInfo = {
    pointcount: isNaN(req.query['pointcount']) ? null : req.query['pointcount'],
  };


  //////////////////////
  // Approximate the DOM
  //////////////////////
  const { document } = new JSDOM(
    `<svg preserveAspectRatio='xMinYMin meet' viewBox='0 0 1240 650'></svg>`
  ).window;
  
  const dom = document.querySelector('svg');

  Chart(ChartInfo, dom)

  res.send(dom.outerHTML);
};

export {INFO, handler, handler as default}