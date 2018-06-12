import codeLoader from '../../../src/code-loader/code-loader.js';

describe ('codeLoader', () => {
  it ('returns an object', () => {
    expect(typeof codeLoader()).toBe('object');
  })
})
