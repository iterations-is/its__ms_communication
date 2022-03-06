import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAIL_HOST_PASSWORD, EMAIL_HOST_USER, EMAIL_PORT } from '../constants';

const transport = nodemailer.createTransport({
	host: EMAIL_HOST,
	port: +EMAIL_PORT,
	auth: {
		user: EMAIL_HOST_USER,
		pass: EMAIL_HOST_PASSWORD,
	},
});

export const sendPassword = async (to: string, body: string) => {
	await transport.sendMail({
		from: '"ITS noreply" <noreply@its.its>',
		to,
		subject: 'ITS Password Reset',
		text: body,
		html: body,
	});

	// TODO: log
};
