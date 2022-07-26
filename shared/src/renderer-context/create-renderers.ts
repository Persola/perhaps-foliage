// import Renderer from './renderer/renderer';
import createSyntypeRenderer from './renderer/create-syntype-renderer';

import type { RendersideUninitializedPresentLanguageIntegration } from '../types/language-integration/renderside-uninitialized-present-language-integration';
import type { IntegrationDependencies } from '../types/language-integration/integration-dependencies';
import type { Renderers } from '../types/language-integration/renderers';

export default (
  integrationDependencies: IntegrationDependencies,
  initialRendererIntegration: RendersideUninitializedPresentLanguageIntegration,
): Renderers => {
  const creators = initialRendererIntegration.rendererCreators;
  const renderers = {};

  for (const syntypeName of Object.keys(creators)) {
    const providedRenderer = creators[syntypeName];
    if (typeof providedRenderer === 'function') {
      renderers[syntypeName] = providedRenderer(integrationDependencies);
    } else {
      renderers[syntypeName] = createSyntypeRenderer(providedRenderer);
    }
  }

  return renderers;
};
