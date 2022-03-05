import { Request, Response } from 'express';

import { ExampleReqDTO, ExampleReqDTOSchema } from '../../dto';

/**
 * Requires mwAuthorization
 */
export const epExampleExternal = async (req: Request, res: Response) => {
	// Validation
	const signUpReq: ExampleReqDTO = req.body;
	const { error } = ExampleReqDTOSchema.validate(signUpReq);
	if (error) return res.status(400).json(error);

	// Logic
	const userId = res.locals.userId;

	try {
		return res.status(200).json({ message: '' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error' });
	}
};
