import { JSDOM } from 'jsdom';
import * as d3 from 'd3';

export default function DamProfileChart(info) {
  const { pool, tail, inflow, outflow } = info;

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
  var width = window.innerWidth - margin.left - margin.right; // Use the window's width
  var height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

  var svg = d3
    .select(body)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  return dom;
}
