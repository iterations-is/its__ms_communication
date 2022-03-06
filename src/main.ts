import 'dotenv/config';
import express, { json } from 'express';

import { aboutRouter } from '../src-ms';
import { MS_EXPRESS_PORT } from './constants';
import { externalRouter, internalRouter } from './routes';
import { runBroker } from './broker';

//RMQ
runBroker();

// Express
const app = express();

app.use(json());

app.use('/communication-service', aboutRouter);
app.use('/communication-service', externalRouter);
app.use('/communication-service', internalRouter);

app.listen(MS_EXPRESS_PORT, () => {
	console.log('http://localhost:' + MS_EXPRESS_PORT);
});
