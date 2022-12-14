import initializePresenters from './presenter/generation/initialize-presenters';
import validateGrammar from './code-loader/validate-grammar';

import type { MainsidePresentLangInt } from '../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { MainsideUninitializedPresentLangInt } from '../types/language-integration/interfaces/mainside/mainside-uninitialized-present-lang-int';

export default (
  mutateeIntegration: MainsidePresentLangInt,
  newIntegration: MainsideUninitializedPresentLangInt,
): void => {
  validateGrammar(
    newIntegration.actualGrammar,
    newIntegration.id,
  );

  const {
    id,
    actualGrammar,
    primitives,
    keyToNewSynoAttrs,
    interpret,
    synoValidators,
    presenters,
  } = newIntegration;

  Object.assign(mutateeIntegration, {
    id,
    actualGrammar,
    primitives,
    keyToNewSynoAttrs,
    interpret,
    synoValidators,
    presenters: initializePresenters(presenters),
  });
};
