// import Renderer from './renderer/renderer';
import generateSyntypeRenderer from './generate-renderers/generate-syntype-renderer';

import type { RendersideUninitializedPresentLanguageIntegration } from '../../types/language-integration/renderside-uninitialized-present-language-integration';
import type { UninitializedPresentLanguageIntegration } from '../../types/language-integration/uninitialized-present-language-integration';
import type { Renderers } from '../../types/language-integration/renderers';

export default (
  initialRendererIntegration: (
    UninitializedPresentLanguageIntegration | RendersideUninitializedPresentLanguageIntegration
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
