import { Router } from 'express';
import { epExampleInternal } from './internal';

export const internalRouter = Router();

internalRouter.get('/entityInternal', epExampleInternal);
