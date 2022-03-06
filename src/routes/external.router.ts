import { Router } from 'express';

import { mwAuthorization } from '../../src-ms';
import { epAllNotifications, epDeleteNotification, epReadNotification } from './external';

export const externalRouter = Router();

externalRouter.get('/notifications', mwAuthorization, epAllNotifications);
externalRouter.patch('/notifications/:notificationId', mwAuthorization, epReadNotification);
externalRouter.delete('/notifications/:notificationId', mwAuthorization, epDeleteNotification);
