export default candidateEditorState => {
  if (!Object.keys(candidateEditorState) === ['stageful']) {
    return false;
  }

  const { stageful } = candidateEditorState;

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
