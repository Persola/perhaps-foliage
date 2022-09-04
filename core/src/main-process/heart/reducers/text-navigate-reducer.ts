import nextChar from './text-navigate/next-char';

import type { StateSelector } from '../../../types/state-selector';
import type { TextNavigate } from '../../../types/actions/commands/text-navigate';
import type { MutableEditorState } from '../../../types/editor-state/mutable/mutable-editor-state';
import type { UnistlikeEdit } from '../../../types/unistlike/unistlike-edit';
import type { Warn } from '../../../types/cross-context/warn';

export default (
  state: StateSelector,
  action: TextNavigate,
  draftState: MutableEditorState,
  latestEdit: UnistlikeEdit[],
  warnUser: Warn,
): void => {
  if (!state.inText()) {
    throw new Error('Received text navigation command while not editing text');
  }

  switch (action.direction) {
    case 'prev': {
      if (state.focusedCharIndex() === 0) {
        warnUser('Ignoring navigation to previous sibling: already on first character');
        return;
      }

      draftState.focus.charIndex -= 1;
      return;
    }

    case 'next': {
      nextChar(state, draftState.focus, warnUser);
      return;
    }

    default: {
      throw new Error('unrecognized navigation direction');
    }
  }
};
