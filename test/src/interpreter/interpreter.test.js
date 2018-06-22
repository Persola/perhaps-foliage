import interpreter from '../../../src/interpreter/interpreter.js';

describe ('interpreter', () => {
  describe ('given a boolean literal', () => {
    const syno = { syntype: 'booleanLiteral' };
    const graphCollection = {};

    it ('returns the value wrapped in a interpretation resolution', () => {
      expect(
        interpreter(syno, graphCollection, {})
      ).toEqual({success: true, result: syno});
    })
  })

  describe ('given a function call', () => {
    const syno = require('../../data-mocks/syntactic-nodes/function-call.json');
    const graphCollection = require('../../data-mocks/syntactic-nodes/function-call/function-call-target-collection.json');

    xit ('returns the universal return value', () => { // see resolve-function
      expect(interpretFunctionCall).toHaveBeenCalledWith(syno, graphCollection);
    })
  })
})
