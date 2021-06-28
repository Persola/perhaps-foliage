// @flow
import type { EditorState } from '../types/editor-state';
import type { CharBackspace } from '../types/actions/char-backspace';

export default (key: string, editorState: EditorState): (CharBackspace | false) => {
  if (key === 'backspace') {
    return {
      focusSynoId: editorState.focus.synoId,
      // $FlowFixMe: need to type dependency between presnoIndex and charIndex
      focusPresnoIndex: editorState.focus.presnoIndex,
      // $FlowIssue: flow misses that charIndex is deterministically not false (module typing?)
      focusCharIndex: editorState.focus.charIndex,
      type: 'CHAR_BACKSPACE',
    };
  }
  return false;
};
