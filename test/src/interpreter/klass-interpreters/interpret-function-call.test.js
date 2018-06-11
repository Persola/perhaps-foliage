import interpretFunctionCall from '../../../../src/interpreter/klass-interpreters/interpret-function-call.js';

describe ('interpretFunctionCall', () => {
  const graphToInterpret = require('../../../data-mocks/syntactic-nodes/function-call.json');
  const graphCollection = require('../../../data-mocks/syntactic-nodes/function-call/function-call-target-collection.json');

  it ('returns the universal return value', () => { // see resolve-function
    expect(
      interpretFunctionCall(graphToInterpret, graphCollection)
    ).toEqual({
      success: true,
      result: {
        klass: 'booleanLiteral',
        value: true
      }
    });
  })
})
