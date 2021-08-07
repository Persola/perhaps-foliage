import type { IntegrationDependencies } from 'saliva-repl/dist/types/language-integration/integration-dependencies';
import type { Renderers } from 'saliva-repl/dist/types/language-integration/renderers';

import createTitan from './create-titan';
import createOlympian from './create-olympian';

export default (
  integrationDependencies: IntegrationDependencies,
): Renderers => {
  return {
    titan: createTitan(integrationDependencies),
    olympian: createOlympian(integrationDependencies),
  };
};
