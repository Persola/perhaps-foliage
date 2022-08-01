import validateGrammar from '../../code-loader/validate-grammar';

import type { MutableEditorState } from '../../../types/mutable-editor-state';
import type { EndIntegrationHotload } from '../../../types/actions/end-integration-hotload';
import type { StateSelector } from '../../../types/state-selector';
import type { MainsideLanguageIntegration } from '../../../types/language-integration/mainside-language-integration';
import type { MainsidePresentLanguageIntegration } from '../../../types/language-integration/mainside-present-language-integration';
import type { MutableSynoMap } from '../../../types/syntactic/mutables/mutable-syno-map';

export default (
  state: StateSelector,
  action: EndIntegrationHotload,
  draftState: MutableEditorState,
  mutateeIntegration: MainsideLanguageIntegration, // the integration object used by dependants
): void => {
  if (state.loadingIntegration() === false) {
    throw new Error(
      'Tried to end integration load while there was no integration being loaded',
    );
  }

  validateGrammar(
    action.newIntegrationAttrs.grammar,
    action.newIntegrationAttrs.id,
  );

  const presentMutateeIntegration: MainsidePresentLanguageIntegration = mutateeIntegration;
  Object.assign(presentMutateeIntegration, action.newIntegrationAttrs);
  const primitives: MutableSynoMap = action.newIntegrationAttrs.primitives;
  Object.assign(draftState, {
    integrationId: action.newIntegrationAttrs.id,
    grammar: action.newIntegrationAttrs.grammar,
    primitives,
    keyToNewSynoAttrs: action.newIntegrationAttrs.keyToNewSynoAttrs,
    lastIntegrationBindings: state.keyToNewSynoAttrs()
      ? Object.keys(state.keyToNewSynoAttrs())
      : [],
    synoMap: null,
    resultTree: null,
    inverseReferenceMap: null,
    focus: null,
    resultSyntreeRootId: null,
    interpreting: false,
    resultOutdated: false,
    loadingIntegration: false,
    loadingSyntree: false,
  });
};
