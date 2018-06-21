import codeLoader from '../../../src/code-loader/code-loader.js';

describe ('codeLoader', () => {
  it ('can respond with proxyNorCall', () => {
    expect(typeof codeLoader('proxyNorCall')).toBe('object');
  })

  it ('can respond with proxyNorCall', () => {
    expect(typeof codeLoader('proxyNorCall')).toBe('object');
  })

  it ('can respond with proxyNorCall', () => {
    expect(() => { codeLoader() }).toThrow('requested syntactic map does not exist');
  })
})
