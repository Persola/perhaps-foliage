import createTitan from './create-titan';
import createOlympian from './create-olympian';

import type { IntegrationDependencies } from '../../src/types/language-integration/integration-dependencies';
import type { Renderers } from '../../src/types/language-integration/renderers';

export default (
  integrationDependencies: IntegrationDependencies,
): Renderers => {
  return {
    titan: createTitan(integrationDependencies),
    olympian: createOlympian(integrationDependencies),
  };
};
