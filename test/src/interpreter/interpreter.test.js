import interpreter from '../../../src/extension-staging-area/saliva/interpreter/interpreter';

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
    import syno from '../../data-mocks/syntactic-nodes/function-callon';
    import graphCollection from '../../data-mocks/syntactic-nodes/function-call/function-call-target-collectionon';

    xit ('returns the universal return value', () => { // see resolve-function
      expect(interpretFunctionCall).toHaveBeenCalledWith(syno, graphCollection);
    })
  })
})
