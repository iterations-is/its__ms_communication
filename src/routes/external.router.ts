import { Router } from 'express';
import { mwAuthorization as mwA, mwPermissions as mwP } from '@its/ms';
import { epAllNotifications, epDeleteNotification, epReadNotification } from './external';

export const externalRouter = Router();

const pAAU = ['admin', 'authority', 'user'];

externalRouter.get('/notifications', mwA, mwP(pAAU), epAllNotifications);
externalRouter.patch('/notifications/:notificationId', mwA, mwP(pAAU), epReadNotification);
externalRouter.delete('/notifications/:notificationId', mwA, mwP(pAAU), epDeleteNotification);
