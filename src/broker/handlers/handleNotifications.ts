import { Message } from 'amqplib/callback_api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handleNotifications = async (message: Message | null) => {
	if (message) {
		const data = JSON.parse(message.content.toString());

		await prisma.notification.create({
			data: {
				description: data.description ?? '',
				isRead: false,
				createdAt: data.createdAt ?? new Date(),
				userId: data.userId,
			},
		});
	}
};
