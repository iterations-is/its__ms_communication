import { Request, Response } from 'express';
import { prisma } from '../../utils';
import { BrokerMessageLog, MessageDTO } from '@its/ms';
import { logger } from '../../broker';
import { MS_NAME } from '../../constants';

export const epDeleteNotification = async (req: Request, res: Response) => {
	const notificationId = req.params.notificationId;
	const userId = res.locals.userId;

	try {
		const removedInfo = await prisma.notification.deleteMany({
			where: {
				id: notificationId,
				userId,
			},
		});

		if (removedInfo.count === 0) {
			logger.send({
				createdAt: new Date(),
				description: `User ${userId} tried to delete the notification ${notificationId} but it does not exist`,
				ms: MS_NAME,
			} as BrokerMessageLog);

			return res.status(404).json({ message: 'user notification not found' } as MessageDTO);
		}

		return res.status(200).json({ message: 'user notification was deleted' } as MessageDTO);
	} catch (error) {
		logger.send({
			createdAt: new Date(),
			description: `User ${userId} tried to delete the notification ${notificationId} but server failed.`,
			ms: MS_NAME,
			data: error,
		} as BrokerMessageLog);

		return res.status(500).json({ message: 'internal server error' } as MessageDTO);
	}
};
