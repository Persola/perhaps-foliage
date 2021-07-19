// // @flow
import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { EndIntegrationLoad } from '../../types/actions/end-integration-load';
import type { StateSelector } from '../../types/state-selector';
import type { LanguageIntegration } from '../../types/language-integration';
import type { PresentLanguageIntegration } from '../../types/language-integration/present-language-integration';
import type { MutableSynoMap } from '../../types/mutable-syno-map';

export default (
  state: StateSelector,
  action: EndIntegrationLoad, // contains the incoming integration
  draftState: MutableEditorState,
  mutateeIntegration: LanguageIntegration, // the integration object used by dependants
): void => {
  if (state.loadingIntegration() === false) {
    throw new Error('Tried to end integration load while there was no integration being loaded');
  }

  const presentMutateeIntegration: PresentLanguageIntegration = (mutateeIntegration: any);
  Object.assign(presentMutateeIntegration, action.newIntegrationAttrs);

  const primitives: MutableSynoMap = (action.newIntegrationAttrs.primitives: any);
  Object.assign(draftState, {
    integrationId: action.newIntegrationAttrs.id,
    grammar: action.newIntegrationAttrs.grammar,
    primitives,
    keyToNewSynoAttrs: action.newIntegrationAttrs.keyToNewSynoAttrs,
    lastIntegrationBindings: Object.keys(state.keyToNewSynoAttrs()),
    synoMap: false,
    resultTree: false,
    inverseReferenceMap: false,
    focus: false,
    resultSyntreeRootId: false,
    interpreting: false,
    resultOutdated: false,
    loadingIntegration: false,
    loadingSyntree: false,
  });
};
