import amqp from 'amqplib/callback_api';

import { BROKER_CHANNEL_NOTIFICATIONS, BROKER_URL } from '../constants';
import { handleEmails, handleNotifications } from './handlers';
import { BROKER_CHANNEL_EMAILS } from '../../../its__ms_auth/src/constants';

export const runBroker = () => {
	try {
		amqp.connect(BROKER_URL, (errorConnection, connection) => {
			if (errorConnection) {
				// TODO: log
				throw errorConnection;
			}

			connection.createChannel((errorChannel, channel) => {
				if (errorChannel) {
					// TODO: log
					throw errorChannel;
				}

				// Crate a queue for the channel
				channel.assertQueue(BROKER_CHANNEL_NOTIFICATIONS, {
					durable: false,
				});

				// TODO: log ready for messages
				console.log(`waiting`);

				// Handlers
				channel.consume(BROKER_CHANNEL_EMAILS, handleEmails, { noAck: true });
				channel.consume(BROKER_CHANNEL_NOTIFICATIONS, handleNotifications, { noAck: true });
			});
		});
	} catch (error) {
		// TODO: handle error
		console.log(error);
	}
};
