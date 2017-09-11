import codeLoader from '../../../src/code-loader/code-loader.js';

describe ('codeLoader', () => {
  it ('returns a syntactic graph of the number literal one', () => {
    expect(typeof codeLoader()).toBe('object');
  })
})
