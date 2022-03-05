import { AxiosError } from 'axios';

import { MessageDTO } from '../dto';

export const handleRestError = (error: AxiosError): [number, MessageDTO] => {
	if (error.response) {
		return [error.response.status, error.response.data];
	} else if (error.request) {
		return [
			500,
			{
				message: 'server not responding',
			},
		];
	} else {
		return [
			500,
			{
				message: 'global server error',
				payload: error.response.data,
			},
		];
	}
};
