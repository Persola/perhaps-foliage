import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { EndIntegrationLoad } from '../../types/actions/end-integration-load';
import type { StateSelector } from '../../types/state-selector';
import type { LanguageIntegration } from '../../types/language-integration';
import type { PresentLanguageIntegration } from '../../types/language-integration/present-language-integration';
import type { MutableSynoMap } from '../../types/syntactic/mutables/mutable-syno-map';

export default (
  state: StateSelector,
  action: EndIntegrationLoad,
  draftState: MutableEditorState,
  mutateeIntegration: LanguageIntegration, // the integration object used by dependants
): void => {
  if (state.loadingIntegration() === false) {
    throw new Error(
      'Tried to end integration load while there was no integration being loaded',
    );
  }

  const presentMutateeIntegration: PresentLanguageIntegration = mutateeIntegration;
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
