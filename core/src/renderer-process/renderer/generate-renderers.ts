// import Renderer from './renderer/renderer';
import generateSyntypeRenderer from './generate-renderers/generate-syntype-renderer';

import type { RendersideUninitializedPresentLangInt } from '../../types/language-integration/interfaces/renderside/renderside-uninitialized-present-lang-int';
import type { UninitializedPresentLangInt } from '../../types/language-integration/interfaces/complete/uninitialized-present-lang-int';
import type { Renderers } from '../../types/renderer/renderers';

export default (
  initialRendererIntegration: (
    UninitializedPresentLangInt | RendersideUninitializedPresentLangInt
  ),
): Renderers => {
  const { rendererAttrs, grammar } = initialRendererIntegration;
  const renderers = {};

  for (const syntypeName of Object.keys(rendererAttrs)) {
    renderers[syntypeName] = generateSyntypeRenderer(
      rendererAttrs[syntypeName],
      grammar[syntypeName],
    );
  }

  return renderers;
};
