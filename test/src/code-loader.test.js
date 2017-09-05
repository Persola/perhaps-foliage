import codeLoader from '../../src/code-loader.js';

describe ('CodeStage', () => {
  describe ('.syntaticGraphSeed', () => {
    it ('returns a syntactic graph of the number literal one', () => {
      expect(codeLoader()).toEqual({
        klass: 'numberLiteral',
        data: 1
      });
    })
  })
})
