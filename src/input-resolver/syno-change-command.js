// @flow
import type { EditorState } from '../types/editor-state'

export default (key: string, editorState: EditorState) => {
  const value = (
    ['0', '1'].includes(key)
    ? Boolean(Number(key))
    : key === 'f' ? false : true
  )

  const { focus: { synoId } } = editorState;

  return ({
    type: 'REPLACE_FOCUSED_NODE',
    newSynoAttrs: {
      syntype: 'booleanLiteral',
      value
    },
    newSynoId: `inputValue-${String(Math.random()).substring(2)}`,
    focusedPresnoId: synoId
  });
}
