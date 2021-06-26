// @flow
import type { ChildPresnoRef } from '../types/child-presno-ref'
import type { EditorState } from '../types/editor-state'
import type { CharBackspace } from '../types/actions/char-backspace'

export default (key: string, editorState: EditorState): (CharBackspace | false) => {
  if (editorState.focus.presnoIndex === false) {
    throw new Error('focus has char index without presno index ? (flow)');
  }
  if (editorState.focus.charIndex === false) {
    throw new Error('char index is missing even though it used to be checked right before this (flow)');
  }
  if (key === 'backspace') {
    return {
      focusSynoId: editorState.focus.synoId,
      focusPresnoIndex: editorState.focus.presnoIndex,
      focusCharIndex: editorState.focus.charIndex,
      type: 'CHAR_BACKSPACE'
    };
  } else {
    return false;
  }
}
