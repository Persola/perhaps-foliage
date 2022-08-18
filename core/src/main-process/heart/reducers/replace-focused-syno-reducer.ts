import replaceSyno from '../../../syntree-utils/exposed/replace-syno';

import type { StateSelector } from '../../../types/state-selector';
import type { ReplaceFocusedSyno } from '../../../types/actions/replace-focused-syno';
import type { MutableEditorState } from '../../../types/mutable-editor-state';
import type { MainsideLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { KeyToNewSynoAttrs } from '../../../types/language-integration/key-to-new-syno-attrs';
import type { UnistlikeEdit } from '../../../types/unistlike/unistlike-edit';
import type { Warn } from '../../../types/cross-context/warn';

export default (
  state: StateSelector,
  action: ReplaceFocusedSyno,
  draftState: MutableEditorState,
  integration: MainsideLangInt,
  latestEdit: UnistlikeEdit[],
  warnUser: Warn,
): void => {
  if (state.integrationLoaded() === false) {
    warnUser('Ignoring REPLACE_FOCUSED_SYNO action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    warnUser('Ignoring REPLACE_FOCUSED_SYNO action: no tree loaded');
    return;
  }

  const keyToNewSynoAttrs: KeyToNewSynoAttrs = integration.keyToNewSynoAttrs;

  latestEdit.push({
    undo: {
      type: 'REPLACE_SYNO',
    },
    redo: {
      type: 'REPLACE_SYNO',
    },
  });

  const newSynoSyntypeAttrs = keyToNewSynoAttrs[action.input];
  const newSynoId = `inputValue-${String(Math.random()).substring(2)}`;
  replaceSyno( // syno map updates
    state,
    draftState,
    draftState.synoMap,
    state.focusedSyno().id,
    state.focusedSyno().parent?.id,
    newSynoId,
    newSynoSyntypeAttrs,
  );
  draftState.focus = {
    synoId: newSynoId,
    presnoIndex: null,
    charIndex: null,
  };
  draftState.resultOutdated = true;
};
