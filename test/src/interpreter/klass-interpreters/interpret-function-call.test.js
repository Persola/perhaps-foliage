import interpretFunctionCall from '../../../../src/extension-staging-area/saliva/interpreter/syntype-interpreters/interpret-function-call';

describe ('interpretFunctionCall', () => {
  import syno from '../../../data-mocks/syntactic-nodes/function-callon';
  import graphCollection from '../../../data-mocks/syntactic-nodes/function-call/function-call-target-collectionon';

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
