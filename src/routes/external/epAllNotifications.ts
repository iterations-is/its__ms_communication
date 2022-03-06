import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Requires mwAuthorization
 */
export const epAllNotifications = async (req: Request, res: Response) => {
	// Logic
	const userId = res.locals.userId;

	try {
		const notifications = await prisma.notification.findMany({
			where: { userId },
			orderBy: [
				{
					createdAt: 'desc',
				},
				{
					isRead: 'desc',
				},
			],
		});

		return res.status(200).json({ message: 'notifications', payload: notifications });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error' });
	}
};
