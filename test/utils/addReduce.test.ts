import { addNumbers, reduceNumbers } from '../../src/utils';

describe('Integration - addReduce', () => {
	it('should add two numbers', () => {
		expect(reduceNumbers([1, 2, 3], addNumbers)).toBe(6);
	});
});
