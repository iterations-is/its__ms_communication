import { Request, Response } from 'express';
import { prisma } from '../../utils';
import { BrokerMessageLog, MessageDTO } from '@its/ms';
import { logger } from '../../broker';
import { MS_NAME } from '../../constants';

export const epAllNotifications = async (req: Request, res: Response) => {
	// Logic
	const userId = res.locals.userId;
	const page = Math.floor(+req.query.page) || 1;
	const pageSize = Math.floor(+req.query.pageSize) || 20;

	try {
		const notificationsTotal = await prisma.notification.count({
			where: { userId },
		});

		const notifications = await prisma.notification.findMany({
			skip: (page - 1) * pageSize,
			take: pageSize,
			where: { userId },
			orderBy: [{ isRead: 'asc' }, { createdAt: 'desc' }],
		});

		return res.status(200).json({
			message: 'notifications',
			payload: {
				notifications,
				pagination: {
					total: notificationsTotal,
				},
			},
		} as MessageDTO);
	} catch (error) {
		logger.send({
			createdAt: new Date(),
			description: `Cannot get all notifications for user ${userId}`,
			ms: MS_NAME,
			data: error,
		} as BrokerMessageLog);

		return res.status(500).json({ message: 'internal server error' } as MessageDTO);
	}
};
