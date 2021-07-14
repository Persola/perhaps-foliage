// @flow
import type { StateSelector } from '../types/state-selector';
import type { CharBackspace } from '../types/actions/char-backspace';

export default (key: string, state: StateSelector): (CharBackspace | false) => {
  if (key === 'backspace') {
    return {
      focusSynoId: state.focusedSynoId(),
      // $FlowFixMe: need to type dependency between presnoIndex and charIndex
      focusPresnoIndex: state.focusedPresnoIndex(),
      // $FlowIssue: flow misses that charIndex is deterministically not false (module typing?)
      focusCharIndex: state.focusedCharIndex(),
      type: 'CHAR_BACKSPACE',
    };
  }
  return false;
};
