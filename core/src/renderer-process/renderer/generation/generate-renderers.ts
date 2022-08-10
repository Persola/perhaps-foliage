// import Renderer from './renderer/renderer';
import generateSyntypeRenderer from './generate-syntype-renderer';

import type { RendersideUninitializedPresentLangInt } from '../../../types/language-integration/interfaces/renderside/renderside-uninitialized-present-lang-int';
import type { UninitializedPresentLangInt } from '../../../types/language-integration/interfaces/complete/uninitialized-present-lang-int';
import type { Renderers } from '../../../types/renderer/renderers';

export default (
  initialRendererIntegration: (
    UninitializedPresentLangInt | RendersideUninitializedPresentLangInt
  ),
): Renderers => {
  const { renderers: rendererProvisions, grammar } = initialRendererIntegration;

  const renderers = {};

  for (const [syntypeName, provision] of Object.entries(rendererProvisions)) {
    if (provision.constructor === Function) {
      renderers[syntypeName] = provision;
    } else {
      renderers[syntypeName] = generateSyntypeRenderer(
        rendererProvisions[syntypeName],
        grammar[syntypeName],
      );
    }
  }

  return renderers;
};
