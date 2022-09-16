import { JSDOM } from 'jsdom';
import * as d3 from 'd3';
import {
  OutflowIcon,
  SurchargeIcon,
  straightLine,
  curvedLine,
  createLine,
} from './helpers.js';

const createLegend = (svg) => {
  svg
    .append('g')
    .attr('class', 'legend')
    .append('text')
    .attr('dx', 1020)
    .attr('dy', 60)
    .attr('font-family', 'sans-serif')
    .attr('font-size', '1.5em')
    .text('Legend');
  svg
    .select('g.legend')
    .append('path')
    .attr(
      'd',
      straightLine([
        [1010, 70],
        [1220, 70],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('fill', '#B3B3B3')
    .attr('stroke-width', 3);
  //create lake level icon
  svg
    .select('g.legend')
    .append('path')
    .attr(
      'd',
      straightLine([
        [1010, 90],
        [1010, 80],
        [1020, 80],
        [1020, 90],
        [1010, 90],
      ])
    )
    .attr('fill', '#DCF1F9')
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 1);
  svg
    .select('g.legend')
    .append('text')
    .attr('dx', 1030)
    .attr('dy', 90)
    .attr('font-family', 'sans-serif')
    .text('Current Lake Level');
  //create tail water icon
  svg
    .select('g.legend')
    .append('path')
    .attr(
      'd',
      straightLine([
        [1010, 100],
        [1010, 110],
        [1020, 110],
        [1020, 100],
        [1010, 100],
      ])
    )
    .attr('fill', '#83BADF')
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 1);
  svg
    .select('g.legend')
    .append('text')
    .attr('dx', 1030)
    .attr('dy', 110)
    .attr('font-family', 'sans-serif')
    .text('Tail Water');
  //create inflow icon
  svg
    .select('g.legend')
    .append('circle')
    .attr('r', 12)
    .attr('cx', 1015)
    .attr('cy', 130)
    .attr('fill', '#66AAD7');
  svg
    .select('g.legend')
    .append('text')
    .attr('dx', 1009)
    .attr('dy', 134)
    .attr('font-family', 'sans-serif')
    .attr('fill', '#fff')
    .attr('font-size', '12px')
    .text('IN');
  svg
    .select('g.legend')
    .append('text')
    .attr('dx', 1030)
    .attr('dy', 135)
    .attr('font-family', 'sans-serif')
    .text('Inflow');
  //create surcharge icon
  svg
    .select('g.legend')
    .append('circle')
    .attr('r', 12)
    .attr('cx', 1015)
    .attr('cy', 160)
    .attr('fill', '#66AAD7');
  svg
    .select('g.legend')
    .append('text')
    .attr('dx', 1005)
    .attr('dy', 164)
    .attr('font-family', 'sans-serif')
    .attr('fill', '#fff')
    .attr('font-size', '10px')
    .text('SUR');
  svg
    .select('g.legend')
    .append('text')
    .attr('dx', 1030)
    .attr('dy', 165)
    .attr('font-family', 'sans-serif')
    .text('Surcharge Release');
  //create outflow icon
  svg
    .select('g.legend')
    .append('circle')
    .attr('r', 12)
    .attr('cx', 1015)
    .attr('cy', 190)
    .attr('fill', '#0F4868');
  svg
    .select('g.legend')
    .append('text')
    .attr('dx', 1005)
    .attr('dy', 194)
    .attr('font-family', 'sans-serif')
    .attr('fill', '#fff')
    .attr('font-size', '10px')
    .text('OUT');
  svg
    .select('g.legend')
    .append('text')
    .attr('dx', 1030)
    .attr('dy', 195)
    .attr('font-family', 'sans-serif')
    .text('Outflow');
};

export default function DamProfileChart(info) {
  const {
    damTop = 24,
    damBottom = 0,
    height = undefined,
    waterLevel = 12,
    browser,
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
  // Number Format
  var numFormat = d3.format('.2f');
  // Tick Scale
  var tickScale = d3.scaleLinear().domain([0, 17]).range([damTop, damBottom]);
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
  //////////////////////////
  svg
    .append('g')
    .attr('class', 'leftLine')
    .append('path')
    .attr(
      'd',
      curvedLine([
        [0, 100],
        [220, 100],
        [243, 130],
        [243, 150],
        [243, 560],
        [243, 560],
        [243, 560],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 7)
    .attr('fill', 'none')
    .attr('stroke-linejoin', 'miter');

  //////////////////////////
  // create center dam
  //////////////////////////
  svg
    .select('g.leftLine')
    .append('path')
    .attr(
      'd',
      straightLine([
        [410, 561],
        [410, 150],
        [390, 150],
        [390, 130],
        [510, 130],
        [510, 150],
        [490, 170],
        [490, 210],
        [560, 440],
        [610, 440],
        [610, 561],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 2)
    .attr('fill', '#B3B3B3')
    .attr('stroke-linejoin', 'bevel');

  ////////////////////////////
  // Draw Water Level
  // replaces drawWaterLevel()
  ////////////////////////////
  svg.append('g').attr('class', 'water-level');
  // water level line
  svg
    .select('g.water-level')
    .append('path')
    .attr(
      'd',
      straightLine([
        [247, damScale(waterLevel)],
        [247, 560],
        [409, 560],
        [409, damScale(waterLevel)],
      ])
    )
    .attr('fill', '#DCF1F9');
  // water level label (e.g. 12')
  svg
    .select('g.water-level')
    .append('text')
    .attr('text-anchor', 'start')
    .attr('dx', 250)
    .attr('dy', damScale(waterLevel) + 20)
    .attr('fill', '#666666')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '24px')
    .text(function () {
      return waterLevel + "'";
    });

  createLegend(svg);

  ////////////////////////////
  // Create Inflow Icon
  // replaces createInflowIcon
  ////////////////////////////
  svg
    .append('g')
    .attr('class', 'inflowIcon')
    .append('circle')
    .attr('r', 25)
    .attr('cx', 320)
    .attr('cy', 60)
    .attr('fill', '#66AAD7');
  svg
    .select('g.inflowIcon')
    .append('path')
    .attr(
      'd',
      straightLine([
        [315, 70],
        [315, 100],
        [300, 100],
        [320, 120],
        [340, 100],
        [325, 100],
        [325, 70],
      ])
    )
    .attr('fill', '#66AAD7');
  svg
    .select('g.inflowIcon')
    .append('path')
    .attr(
      'd',
      straightLine([
        [60, 58],
        [320, 58],
        [320, 65],
        [60, 65],
      ])
    )
    .attr('fill', '#66AAD7');
  svg
    .select('g.inflowIcon')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dx', 320)
    .attr('dy', 67)
    .attr('fill', '#fff')
    .attr('font-family', 'sans-serif')
    .text('IN');

  ////////////////////////////
  // Draw Mountain
  // replaces drawMountain
  ////////////////////////////
  svg
    .append('g')
    .attr('class', 'mountain')
    .append('path')
    .attr(
      'd',
      straightLine([
        [10, 100],
        [20, 60],
        [35, 45],
        [40, 35],
        [60, 25],
        [75, 65],
        [90, 70],
        [110, 100],
      ])
    )
    .attr('stroke', '#B3B3B3')
    .attr('stroke-width', 2)
    .attr('fill', '#B3B3B3');
  //draw mountain accent 1
  svg
    .select('g.mountain')
    .append('path')
    .attr(
      'd',
      straightLine([
        [20, 100],
        [25, 90],
        [22, 75],
        [30, 55],
        [27, 75],
        [40, 90],
        [40, 100],
      ])
    )
    .attr('fill', '#58595D');
  //draw mountain accent 2
  svg
    .select('g.mountain')
    .append('path')
    .attr(
      'd',
      straightLine([
        [60, 72],
        [95, 100],
        [85, 100],
        [70, 90],
        [65, 92],
      ])
    )
    .attr('fill', '#58595D');
  // draw mountain accent 3
  svg
    .select('g.mountain')
    .append('path')
    .attr(
      'd',
      straightLine([
        [60, 60],
        [55, 40],
        [63, 55],
        [62, 57],
        [70, 65],
      ])
    )
    .attr('fill', '#58595D');

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

  ///////////////////////////
  // Elements when No Lock
  // replaces noLock()
  //////////////////////////
  // Rectangle bottom of dam
  svg
    .append('g')
    .attr('class', 'nolock')
    .append('path')
    .attr(
      'd',
      straightLine([
        [239, 560],
        [611, 560],
        [611, 590],
        [239, 590],
      ])
    )
    .attr('fill', '#B3B3B3');
  // Tailwater
  svg
    .select('g.nolock')
    .append('path')
    .attr(
      'd',
      straightLine([
        [611, 510],
        [611, 590],
        [1210, 590],
        [1210, 510],
      ])
    )
    .attr('fill', '#85BBDF');

  // @todo refactor turbine logic
  // if (options.hasTurbine) {
  //   createTurbine();
  // }

  ///////////////////////////
  // Tick Marks
  // replaces drawTicks()
  //////////////////////////
  // @todo; consider more consistent scale, not based
  //        on the top/bottom of dam divided into 18 equal
  //        increments, as this creates unexpected tick
  //        values (e.g. 1.41, 1.52)
  svg.append('g').attr('class', 'ticks');
  var length = 5;
  var strokeWidth = 4;
  for (var i = 0; i < 18; i++) {
    if (i % 2 === 0) {
      strokeWidth = 4;
      length = 15;
    } else {
      strokeWidth = 2;
      length = 10;
    }
    svg
      .select('g.ticks')
      .append('path')
      .attr('d', createLine(length))
      .attr('stroke-width', strokeWidth)
      .attr('stroke', '#B3B3B3')
      .attr(
        'transform',
        'translate(' + (240 - length) + ',' + (130 + i * 25.4) + ')'
      );

    svg
      .select('g.ticks')
      .append('text')
      .attr('font-family', 'sans-serif')
      .attr('fill', '#b3b3b3')
      .attr('font-size', '12px')
      .attr('transform', 'translate(' + 180 + ',' + (135 + i * 25.4) + ')')
      .text(numFormat(tickScale(i)));
  }
  OutflowIcon(svg, { x: 600, y: 360 });
  SurchargeIcon(svg);
  // createMiddleGradient(mode);
  // drawDashedLines(options.horizontalLabels);
  // setText(mode);

  return dom;
}
