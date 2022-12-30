import dotenv from 'dotenv';

import {INFO as DamProfileChartInfo} from './handlers/dam-profile-chart.js';
import {INFO as ExampleScatterInfo} from './handlers/example-scatter.js';

dotenv.config();
const ROOT_URL = process.env.ROOT_URL;

export default [
  {
    id: '53da77d0-6550-4f02-abf8-4bcd1a596a7c',
    slug: 'dam-profile-chart',
    url: '/dam-profile-chart',
    ...DamProfileChartInfo,
  },
  {
    id: '61910b8c-4dfb-4343-affb-d478b6bf915f',
    slug: 'example-scatter',
    url: '/example-scatter',
    ...ExampleScatterInfo,
  },
].map((item) => ({ ...item, url: `${ROOT_URL}${item.url}` }));
