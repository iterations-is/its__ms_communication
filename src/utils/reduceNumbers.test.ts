import { reduceNumbers } from './reduceNumbers';

describe('reduceNumbers', () => {
	it('should return the sum of all numbers', () => {
		const reducer = (a: number, b: number) => a + b;
		expect(reduceNumbers([1, 2, 3, 4, 5], reducer)).toBe(15);
	});
});
