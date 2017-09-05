import CodeLoader from '../../src/code-loader.js';

describe ('CodeStage', () => {
  describe ('.default', () => {
    it ('returns a syntactic graph of the number literal one', () => {
      expect(CodeLoader.default()).toEqual({
        klass: 'numberLiteral',
        data: 1
      });
    })
  })
})
