type Reducer = (accumulator: number, currentValue: number) => number;

export const reduceNumbers = (numbers: number[], fn: Reducer) => numbers.reduce(fn, 0);
