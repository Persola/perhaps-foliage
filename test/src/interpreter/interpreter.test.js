import interpreter from '../../../src/interpreter/interpreter.js';

describe ('interpreter', () => {
  it ('is the identity function', () => {
    const value = 917718;
    expect(interpreter(value)).toBe(value);
  })
})
