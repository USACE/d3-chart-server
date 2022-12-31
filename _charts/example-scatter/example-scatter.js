import * as d3 from 'd3';

import allData from './data.js';

export default function ExampleScatter(info = {}, dom) {
  const { pointcount } = info;

  const data =
    !pointcount || pointcount >= allData.length
      ? [...allData]
      : [...allData.slice(0, Math.round(pointcount))];

  ////////////
  // D3 SCRIPT
  ////////////
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const width = 1200 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  // Clear any InnerHTML in the case that this function has already run against the provided dom
  d3.select(dom).selectChildren().remove();

  // Get SVG
  var svg = d3
    .select(dom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Add X axis
  var x = d3.scaleLinear().domain([0, 4000]).range([0, width]);
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 500000]).range([height, 0]);
  svg.append('g').call(d3.axisLeft(y));

  // Add dots
  svg
    .append('g')
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
      return x(d.GrLivArea);
    })
    .attr('cy', function (d) {
      return y(d.SalePrice);
    })
    .attr('r', 1.5)
    .style('fill', '#69b3a2');
}
