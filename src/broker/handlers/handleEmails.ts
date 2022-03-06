import { Message } from 'amqplib/callback_api';
import { sendPassword } from '../../mail';

export const handleEmails = (message: Message | null) => {
	if (message) {
		const data = JSON.parse(message.content.toString());
		const { to, text } = data;
		console.log(data);

		sendPassword(to, text);
	}
};
