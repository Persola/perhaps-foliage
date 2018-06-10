import interpreter from '../../../src/interpreter/interpreter.js';

describe ('interpreter', () => {
  describe ('given a boolean literal', () => {
    const graphToInterpret = { klass: 'booleanLiteral' };
    const graphCollection = {};

    it ('returns the value wrapped in a interpretation resolution', () => {
      expect(
        interpreter(graphToInterpret, graphCollection)
      ).toEqual({success: true, result: graphToInterpret});
    })
  })

  describe ('given a function call', () => {
    const graphToInterpret = require('../../data-mocks/syntactic-nodes/function-call.json');
    const graphCollection = require('../../data-mocks/syntactic-nodes/function-call/function-call-target-collection.json');

    it ('returns the universal return value', () => { // see resolve-function
      expect(
        interpreter(graphToInterpret, graphCollection)
      ).toEqual({
        success: true,
        result: {
          klass: 'booleanLiteral',
          value: true
        }
      });
    })
  })
})
