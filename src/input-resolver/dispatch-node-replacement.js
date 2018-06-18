// @flow
import type { reduxStore } from '../types/redux-store'

export default (key: string, editorStateStore: reduxStore) => {
  const editorState = editorStateStore.getState();
  const value = (
    ['0', '1'].includes(key)
    ? Boolean(Number(key))
    : key === 'f' ? false : true
  )

  const { stagedNodeId } = editorState;

  editorStateStore.dispatch({
    type: 'REPLACE_FOCUSED_NODE',
    newSynoAttrs: {
      klass: 'booleanLiteral',
      value
    },
    newSynoId: `inputValue-${String(Math.random()).substring(2)}`,
    stagedNodeId
  });
}
