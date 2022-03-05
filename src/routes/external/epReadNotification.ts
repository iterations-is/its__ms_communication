import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Requires mwAuthorization
 */
export const epReadNotification = async (req: Request, res: Response) => {
	const notificationId = req.params.notificationId;

	try {
		const notification = await prisma.notification.findUnique({
			where: {
				id: notificationId,
			},
		});

		const newReadState = !notification.isRead;

		const notificationUpdated = await prisma.notification.update({
			where: {
				id: notificationId,
			},
			data: {
				isRead: newReadState,
			},
		});

		return res
			.status(200)
			.json({ message: 'notification changed its read state', payload: { isRead: newReadState } });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error' });
	}
};
