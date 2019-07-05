// @flow
import type { EditorState } from '../types/editor-state'

export default (key: string, editorState: EditorState) => {
  const { focus: { synoId } } = editorState;

  if (['0', '1', 'f', 't'].includes(key)) {
    const value = (
      ['0', '1'].includes(key)
      ? Boolean(Number(key))
      : key === 'f' ? false : true
    )

    return ({
      type: 'REPLACE_FOCUSED_SYNO',
      newSynoAttrs: {
        syntype: 'booleanLiteral',
        value
      },
      newSynoId: `inputValue-${String(Math.random()).substring(2)}`,
      focusedPresnoId: synoId
    });
  } else if (key === 'backspace') {
    let oldFocusedPresnoRef: ChildPresnoRef;
    if (editorState.focus.presnoIndex === false) {
      oldFocusedPresnoRef = {
        synoRef: true,
        id: editorState.focus.synoId
      };
    } else {
      oldFocusedPresnoRef = {
        synoRef: false,
        parent: {
          synoRef: true,
          id: editorState.focus.synoId
        },
        index: 0
      }
    }
    
    return ({
      type: 'DESTROY_FOCUSED_SYNO',
      focusedPresnoId: synoId,
      oldFocusedPresnoRef
    });
  } else {
    return false;
  }
}
