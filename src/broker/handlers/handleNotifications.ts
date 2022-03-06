import { Message } from 'amqplib/callback_api';

export const handleNotifications = (message: Message | null) => {
	if (message) {
		const data = JSON.parse(message.content.toString());
		console.log(data);
	}
};
