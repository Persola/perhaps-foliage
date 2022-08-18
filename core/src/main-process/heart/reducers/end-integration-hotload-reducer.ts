import updateMainsideIntegration from '../../update-mainside-integration';

import type { MutableEditorState } from '../../../types/mutable-editor-state';
import type { EndIntegrationHotload } from '../../../types/actions/end-integration-hotload';
import type { StateSelector } from '../../../types/state-selector';
import type { MainsideLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';

export default (
  state: StateSelector,
  action: EndIntegrationHotload,
  draftState: MutableEditorState,
  mutateeIntegration: MainsideLangInt, // the integration object used by dependants
): void => {
  const { newIntegrationAttrs } = action;

  if (state.loadingIntegration() === false) {
    throw new Error(
      'Tried to end integration load while there was no integration being loaded',
    );
  }

  const presentMutateeIntegration: MainsidePresentLangInt = mutateeIntegration;

  updateMainsideIntegration(
    presentMutateeIntegration,
    newIntegrationAttrs,
  );

  Object.assign(draftState, {
    integrationId: newIntegrationAttrs.id,
    actualGrammar: newIntegrationAttrs.actualGrammar,
    syntypeSchema: newIntegrationAttrs.syntypeSchema,
    primitives: newIntegrationAttrs.primitives,
    keyToNewSynoAttrs: newIntegrationAttrs.keyToNewSynoAttrs,
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
