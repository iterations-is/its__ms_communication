import nodemailer from 'nodemailer';
import {
	EMAIL_HOST,
	EMAIL_HOST_PASSWORD,
	EMAIL_HOST_USER,
	EMAIL_PORT,
	MS_NAME,
} from '../constants';
import { BrokerMessageLog } from '@its/ms';
import { logger } from '../broker';

const transport = nodemailer.createTransport({
	host: EMAIL_HOST,
	port: +EMAIL_PORT,
	auth: {
		user: EMAIL_HOST_USER,
		pass: EMAIL_HOST_PASSWORD,
	},
});

export const sendPassword = async (to: string, body: string) => {
	try {
		await transport.sendMail({
			from: '"ITS noreply" <noreply@its.its>',
			to,
			subject: 'ITS Password Reset',
			text: body,
			html: body,
		});

		logger.send({
			createdAt: new Date(),
			description: `Email with password was sent to ${to}`,
			ms: MS_NAME,
		} as BrokerMessageLog);
	} catch (error) {
		logger.send({
			createdAt: new Date(),
			description: `Email with password cannot be sent to ${to}`,
			ms: MS_NAME,
			data: error,
		} as BrokerMessageLog);
	}
};
