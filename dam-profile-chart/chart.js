import { JSDOM } from 'jsdom';
import * as d3 from 'd3';

import Dam from './elements/Dam.js';
import Gradient from './elements/Gradient.js';
import InflowIcon from './elements/InflowIcon.js';
import LeftAxis from './elements/LeftAxis.js';
import Legend from './elements/Legend.js';
import Mountain from './elements/Mountain.js';
import OutflowIcon from './elements/OutflowIcon.js';
import SurchargeIcon from './elements/SurchargeIcon.js';
import WaterLevel from './elements/WaterLevel.js';
import TailwaterLevel from './elements/TailwaterLevel.js';
import Levels from './elements/Levels.js';
import Info from './elements/Info.js';

export default function DamProfileChart(info) {
  const {
    pool,
    tail,
    inflow,
    outflow,
    surcharge,
    damBottom,
    damTop,
    height = undefined,
    gradientBottom,
    gradientTop,
    browser,
    levels,
  } = info;

  //////////////////////
  // Approximate the DOM
  //////////////////////
  const dom = new JSDOM(
    `<!DOCTYPE html>
    <meta charset="utf-8">
    
    <style type="text/css">
    /* 13. Basic Styling with CSS */
    
    /* Style the lines by removing the fill and applying a stroke */
    .line {
        fill: none;
        stroke: #ffab00;
        stroke-width: 3;
    }
    
    /* Style the dots by assigning a fill and stroke */
    .dot {
        fill: #ffab00;
        stroke: #fff;
    }
    
    </style>
    <!-- Body tag is where we will append our SVG and SVG objects-->
    <body>
    <text>${JSON.stringify(info)}</text>
    </body>`
  );

  const window = dom.window;
  const body = window.document.body;

  ////////////
  // D3 SCRIPT
  ////////////

  var margin = { top: 50, right: 50, bottom: 50, left: 50 };
  // var width = window.innerWidth - margin.left - margin.right; // Use the window's width
  // var height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
  var cWidth = 1240;
  var cHeight = 650;

  // Dam Scale
  const damScale = d3
    .scaleLinear()
    .domain([damTop, damBottom])
    .range([130, 560]);

  // Build SVG; Add to Chart
  var svg = d3
    .select(body)
    .append('div')
    .classed('svg-container', true)
    .append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', '0 0 ' + cWidth + ' ' + cHeight);

  // @todo; see if this is necessary
  if (height !== undefined) {
    svg.attr('height', height);
  }

  // Handle IE
  if (browser && browser.toUpperCase() === 'IE') {
    svg.attr('style', 'min-height: 650px');
  }

  svg.append('g').classed('svg-content-responsive', true);
  svg.append('defs');

  //////////////////////////
  // create line on the left
  // replaces drawTicks()
  //////////////////////////
  LeftAxis(svg, damTop, damBottom);

  ////////////////////////////
  // Draw Water Level
  // replaces drawWaterLevel()
  ////////////////////////////
  WaterLevel(svg, damScale, pool);
  TailwaterLevel(svg, damScale, tail);

  //////////////////////////
  // create center dam
  // Also includes code
  // previously in noLock()
  //////////////////////////
  Dam(svg);

  ////////////////////////////
  // Create Legend
  // replaces createLegend
  ////////////////////////////
  Legend(svg);

  ////////////////////////////
  // Icons
  ////////////////////////////
  InflowIcon(svg, inflow);
  OutflowIcon(svg, outflow, { x: 600, y: 360 });
  SurchargeIcon(svg, surcharge);

  ////////////////////////////
  // Draw Mountain
  // replaces drawMountain
  ////////////////////////////
  Mountain(svg);

  // @todo
  // need to abstract this concept into multiple visualizations
  // if (options.hasLock) {
  //   createLock();
  //   drawBoat();
  // } else {
  //   if (options.hasTurbine) {
  //     noLockTurbine();
  //   } else {
  //     noLock();
  //   }
  // }

  // @todo refactor turbine logic
  // if (options.hasTurbine) {
  //   createTurbine();
  // }

  //////////////////////////////////////
  // Middle Gradient
  // replaces createMiddleGradient(mode)
  // @todo; Get this working
  // @todo; Confirm desired behavior of
  //        drawn gradient scale
  //        (red, yellow, green)
  //////////////////////////////////////
  if (!isNaN(gradientBottom) && !isNaN(gradientTop)) {
    Gradient(svg, damScale, gradientBottom, gradientTop);
  }

  Levels(svg, damScale, damTop, damBottom, levels);

  Info(svg);

  return dom;
}
