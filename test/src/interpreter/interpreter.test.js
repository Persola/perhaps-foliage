import interpreter from '../../../src/interpreter/interpreter.js';

describe ('interpreter', () => {
  describe ('given a boolean literal', () => {
    const value = { klass: 'booleanLiteral' };

    it ('is the identity function', () => {
      expect(interpreter(value)).toBe(value);
    })
  })

  describe ('given a function call', () => {
    const value = { klass: 'functionCall' };

    it ('is the identity function', () => {
      expect(() => {
        interpreter(value)
      }).toThrow('syntactic graph is incomplete');
    })
  })
})
