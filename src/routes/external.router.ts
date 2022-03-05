import { Router } from 'express';

import { epExampleExternal } from './external';
import { mwAuthorization } from '../../src-ms';

export const externalRouter = Router();

externalRouter.get('/entityExternal', mwAuthorization, epExampleExternal);
