import generateRenderers from './renderer/generation/generate-renderers';

import type { RendersideLangInt } from '../types/language-integration/interfaces/renderside/renderside-lang-int';
import type { RendersideUninitializedPresentLangInt } from '../types/language-integration/interfaces/renderside/renderside-uninitialized-present-lang-int';
import type { UninitializedPresentLangInt } from '../types/language-integration/interfaces/complete/uninitialized-present-lang-int';

export default (
  mutateeIntegration: RendersideLangInt,
  newIntegration: RendersideUninitializedPresentLangInt | UninitializedPresentLangInt,
): void => {
  const {
    id,
    grammar,
    keyToNewSynoAttrs,
    styles,
  } = newIntegration;

  Object.assign(mutateeIntegration, {
    id,
    grammar,
    keyToNewSynoAttrs,
    renderers: generateRenderers(newIntegration),
    styles,
  });
};
