import StateMutator from '../../mutators/state-mutator';

import codeLoader from '../../code-loader/code-loader';
import updateMainsideIntegration from '../../update-mainside-integration';

import type { EndIntegrationHotload } from '../../../types/actions/end-integration-hotload';
import type { MainsideLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';

export default (
  state: StateMutator,
  action: EndIntegrationHotload,
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

  const primitivesTreeId = `editor-instance.integrations.${newIntegrationAttrs.id}.primitives`;
  const treesToAdd = {};
  treesToAdd[primitivesTreeId] = codeLoader.fromSerializedTree(newIntegrationAttrs.primitives);

  Object.assign(state.state, {
    integrationId: newIntegrationAttrs.id,
    actualGrammar: newIntegrationAttrs.actualGrammar,
    syntacticTypeSchema: newIntegrationAttrs.syntacticTypeSchema,
    keyToNewSynoAttrs: newIntegrationAttrs.keyToNewSynoAttrs,
    trees: {
      ...state.state.trees,
      ...treesToAdd,
    },
    primitivesTreeId,
    focus: null,
    interpreting: false,
    resultOutdated: false,
    loadingIntegration: false,
    loadingSyntree: false,
  });
};
