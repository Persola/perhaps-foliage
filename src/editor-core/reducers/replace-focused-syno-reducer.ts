import synoMapReducer from './replace-focused-syno/syno-map';

import type { StateSelector } from '../../types/state-selector';
import type { ReplaceFocusedSyno } from '../../types/actions/replace-focused-syno';
import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { LanguageIntegration } from '../../types/language-integration';
import type { KeyToNewSynoAttrs } from '../../types/language-integration/key-to-new-syno-attrs';
import type { MutableSynoMap } from '../../types/syntactic/mutables/mutable-syno-map';

export default (
  state: StateSelector,
  action: ReplaceFocusedSyno,
  draftState: MutableEditorState,
  integration: LanguageIntegration,
): void => {
  if (state.integrationLoaded() === false) {
    console.warn('Ignoring REPLACE_FOCUSED_SYNO action: no integration loaded');
    return;
  }

  const keyToNewSynoAttrs: KeyToNewSynoAttrs = integration.keyToNewSynoAttrs;

  if (state.treeLoaded() === false) {
    console.warn('Ignoring REPLACE_FOCUSED_SYNO action: no tree loaded');
    return;
  }

  const draftSynoMap: MutableSynoMap = draftState.synoMap;
  const { input } = action;
  const focusSyno = state.focusedSyno();

  if (focusSyno.parent) {
    const parent = state.getSyno(focusSyno.parent.id);
    const newSynoType: string = keyToNewSynoAttrs[input].syntype;
    const grammar = state.grammar();
    const typesAllowedUnderParent: string[] = Object.values(
      grammar[parent.syntype].children,
    ).map(childGrammar => childGrammar.syntype);

    if (!typesAllowedUnderParent.includes(newSynoType)) {
      throw new TypeError(
        `Can't add syno of type '${newSynoType}' under parent of type '${parent.syntype}'`,
      );
    }
  }

  const newSynoAttrs = keyToNewSynoAttrs[input];
  const newSynoId = `inputValue-${String(Math.random()).substring(2)}`;
  synoMapReducer(
    state,
    action,
    draftSynoMap,
    draftState,
    newSynoAttrs,
    newSynoId,
  );
  draftState.focus = {
    synoId: newSynoId,
    presnoIndex: null,
    charIndex: null,
  };
  draftState.resultOutdated = true;
};
