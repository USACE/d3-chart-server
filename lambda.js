// handler for running app.js on AWS Lambda
import serverlessExpress from '@vendia/serverless-express';
import app from './app.js';

const handler = serverlessExpress({ app });

export { handler };
