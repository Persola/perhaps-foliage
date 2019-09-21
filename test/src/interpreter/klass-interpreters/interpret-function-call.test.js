import interpretFunctionCall from '../../../../src/extension-staging-area/saliva/interpreter/syntype-interpreters/interpret-function-call.js';

describe ('interpretFunctionCall', () => {
  const syno = require('../../../data-mocks/syntactic-nodes/function-call.json');
  const graphCollection = require('../../../data-mocks/syntactic-nodes/function-call/function-call-target-collection.json');

  xit ('returns the universal return value', () => { // see resolve-function
    expect(
      interpretFunctionCall(syno, graphCollection)
    ).toEqual({
      success: true,
      result: {
        syntype: 'booleanLiteral',
        value: true
      }
    });
  })
})
