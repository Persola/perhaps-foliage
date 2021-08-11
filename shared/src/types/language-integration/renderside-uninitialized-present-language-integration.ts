import type { KeyToNewSynoAttrs } from './key-to-new-syno-attrs';
import type { Renderers } from './renderers';
import type { IntegrationDependencies } from './integration-dependencies';

export type RendersideUninitializedPresentLanguageIntegration = {
  id: string;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  createRenderers: (integrationDependencies: IntegrationDependencies) => Renderers;
  styles: string;
};
