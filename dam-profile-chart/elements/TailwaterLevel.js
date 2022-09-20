import { straightLine } from './Lines.js';

const TailwaterLevel = (svg, damScale, tailwater) => {
  svg.append('g').attr('class', 'tailwater-level');
  svg
    .select('g.tailwater-level')
    .append('path')
    .attr(
      'd',
      straightLine([
        [490, damScale(tailwater)],
        [490, 590],
        [1210, 590],
        [1210, damScale(tailwater)],
      ])
    )
    .attr('fill', '#85BBDF');

  svg
    .append('g')
    .attr('class', 'labelText')
    .append('text')
    .attr('text-anchor', 'end')
    .attr('dx', 1200)
    .attr('dy', damScale(tailwater) + 20)
    .attr('fill', '#fff')
    .attr('class', 'tailwaterText')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '18px')
    .text(!isNaN(tailwater) ? tailwater + "'" : '');
};

export default TailwaterLevel;
