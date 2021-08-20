import synoMapReducer from './replace-focused-syno/syno-map';
import verifyReplacementAgainstGrammar from './replace-focused-syno/verify-replacement-against-grammar';

import type { StateSelector } from '../../types/state-selector';
import type { ReplaceFocusedSyno } from '../../types/actions/replace-focused-syno';
import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { CoresideLanguageIntegration } from '../../types/language-integration/coreside-language-integration';
import type { KeyToNewSynoAttrs } from '../../types/language-integration/key-to-new-syno-attrs';
import type { UnistlikeEdit } from '../../types/unistlike/unistlike-edit';

export default (
  state: StateSelector,
  action: ReplaceFocusedSyno,
  draftState: MutableEditorState,
  integration: CoresideLanguageIntegration,
  latestEdit: UnistlikeEdit[],
): void => {
  if (state.integrationLoaded() === false) {
    console.warn('Ignoring REPLACE_FOCUSED_SYNO action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    console.warn('Ignoring REPLACE_FOCUSED_SYNO action: no tree loaded');
    return;
  }

  const keyToNewSynoAttrs: KeyToNewSynoAttrs = integration.keyToNewSynoAttrs;

  verifyReplacementAgainstGrammar(
    state,
    action.input,
    keyToNewSynoAttrs,
  );

  const newSynoAttrs = keyToNewSynoAttrs[action.input];
  const newSynoId = `inputValue-${String(Math.random()).substring(2)}`;
  synoMapReducer(
    state,
    action,
    draftState.synoMap,
    draftState,
    newSynoAttrs,
    newSynoId,
    latestEdit,
  );
  draftState.focus = {
    synoId: newSynoId,
    presnoIndex: null,
    charIndex: null,
  };
  draftState.resultOutdated = true;
};
