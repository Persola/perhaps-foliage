// @flow
import type { ReduxStore } from '../types/redux-store'

export default (key: string, editorStateStore: ReduxStore) => {
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
      syntype: 'booleanLiteral',
      value
    },
    newSynoId: `inputValue-${String(Math.random()).substring(2)}`,
    stagedNodeId
  });
}
