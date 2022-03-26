import { Request, Response } from 'express';
import { prisma } from '../../utils';
import { BrokerMessageLog, MessageDTO } from '@its/ms';
import { logger } from '../../broker';
import { MS_NAME } from '../../constants';

export const epReadNotification = async (req: Request, res: Response) => {
	const notificationId = req.params.notificationId;
	const userId = res.locals.userId;

	try {
		const notification = await prisma.notification.findFirst({
			where: {
				id: notificationId,
				userId,
			},
		});

		if (!notification) {
			logger.send({
				createdAt: new Date(),
				description: `User ${userId} tried to update the notification ${notificationId} but it does not exist`,
				ms: MS_NAME,
			} as BrokerMessageLog);

			return res.status(404).json({ message: 'User notification not found' } as MessageDTO);
		}

		const newReadState = !notification.isRead;

		await prisma.notification.update({
			where: { id: notificationId },
			data: { isRead: newReadState },
		});

		return res.status(200).json({
			message: 'notification changed its state',
			payload: { isRead: newReadState },
		} as MessageDTO);
	} catch (error) {
		logger.send({
			createdAt: new Date(),
			description: `User ${userId} tried to update the notification ${notificationId} but server failed.`,
			ms: MS_NAME,
			data: error,
		} as BrokerMessageLog);

		return res.status(500).json({ message: 'internal server error' } as MessageDTO);
	}
};
