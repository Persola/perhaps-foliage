// @flow
import type { ChildPresnoRef } from '../types/child-presno-ref'
import type { EditorState } from '../types/editor-state'

export default (editorState: EditorState) => {
  return {
    focusSynoId: editorState.focus.synoId,
    focusPresnoIndex: editorState.focus.presnoIndex,
    focusCharIndex: editorState.focus.charIndex,
    type: 'CHAR_BACKSPACE'
  };
}
