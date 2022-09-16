import * as d3 from 'd3';

const curvedLine = d3
  .line()
  .x((d) => d[0])
  .y((d) => d[1])
  .curve(d3.curveBasis);

const straightLine = d3
  .line()
  .x((d) => d[0])
  .y((d) => d[1]);

const createLine = (length) => {
  return straightLine([
    [0, 0],
    [length, 0],
  ]);
};

const OutflowIcon = (svg, position = { x: 0, y: 0 }) => {
  //   const outflowCircle = {
  //     dam: { x: 600, y: 360 },
  //     lock: { x: 1000, y: 360 },
  //     lockTurbine: { x: 1000, y: 360 },
  //     turbine: { x: 600, y: 360 },
  //   };
  // Note: arrow coordinates are relative to the position provided to OutflowIcon
  //       Absolute coordinates for SVG are calculated using position coordinates
  const arrow = [
    [20, -5],
    [55, -5],
    [55, -20],
    [80, 0],
    [55, 20],
    [55, 5],
    [20, 5],
  ];
  // circle
  svg
    .append('g')
    .attr('class', 'outflowIcon')
    .append('circle')
    .attr('r', 25)
    .attr('cx', position.x)
    .attr('cy', position.y)
    .attr('fill', '#0F4868');
  // arrow
  svg
    .select('g.outflowIcon')
    .append('path')
    .attr(
      'd',
      straightLine(
        arrow.map((point) => [point[0] + position.x, point[1] + position.y])
      )
    )
    .attr('fill', '#0F4868');
  // label 'OUT'
  svg
    .select('g.outflowIcon')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dx', position.x)
    .attr('dy', position.y + 5)
    .attr('fill', '#fff')
    .attr('font-family', 'sans-serif')
    .text('OUT');
};

const SurchargeIcon = (svg, position = { x: 570, y: 120 }) => {
  // Note: arrow coordinates are relative to the position provided to OutflowIcon
  //       Absolute coordinates for SVG are calculated using position coordinates
  const arrow = [
    [-5, 10],
    [-5, 40],
    [-20, 40],
    [0, 60],
    [20, 40],
    [5, 40],
    [5, 10],
  ];
  svg
    .append('g')
    .attr('class', 'surchargeIcon')
    .append('circle')
    .attr('r', 25)
    .attr('cx', position.x)
    .attr('cy', position.y)
    .attr('fill', '#66AAD7');

  svg
    .select('g.surchargeIcon')
    .append('path')
    .attr(
      'd',
      straightLine(
        arrow.map((point) => [point[0] + position.x, point[1] + position.y])
      )
    )
    .attr('fill', '#66AAD7');
  svg
    .select('g.surchargeIcon')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dx', 570)
    .attr('dy', 126)
    .attr('fill', '#fff')
    .attr('font-family', 'sans-serif')
    .text('SUR');
};

export { curvedLine, straightLine, createLine, OutflowIcon, SurchargeIcon };
