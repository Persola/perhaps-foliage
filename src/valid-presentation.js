// @flow
export default (candidatePresentation: Object) => {
  if (!Object.keys(candidatePresentation) === ['stageful']) {
    return false;
  }

  const { stageful } = candidatePresentation;

  if (!Object.keys(stageful) === ['klass', 'data']) {
    return false;
  }

  if (!stageful.klass === 'numberLiteral') {
    return false;
  }

  if (![0, 1].includes(stageful.data)) {
    return false;
  }

  return true;
};
