import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Requires mwAuthorization
 */
export const epDeleteNotification = async (req: Request, res: Response) => {
	const notificationId = req.params.notificationId;

	try {
		await prisma.notification.delete({
			where: {
				id: notificationId,
			},
		});

		return res.status(200).json({ message: 'deleted' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error' });
	}
};
