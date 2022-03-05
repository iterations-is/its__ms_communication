import Joi from 'joi';

export interface ExampleReqDTO {
	id: string;
}

export const ExampleReqDTOSchema: Joi.ObjectSchema = Joi.object({
	id: Joi.string().required(),
});
