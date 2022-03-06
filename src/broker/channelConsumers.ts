import { BROKER_CHANNEL_EMAILS, BROKER_CHANNEL_NOTIFICATIONS, ChannelConsumer } from '../../src-ms';
import { handleEmails, handleNotifications } from './handlers';

export const channelConsumers: ChannelConsumer[] = [
	{
		name: BROKER_CHANNEL_NOTIFICATIONS,
		handler: handleNotifications,
	},
	{
		name: BROKER_CHANNEL_EMAILS,
		handler: handleEmails,
	},
];
