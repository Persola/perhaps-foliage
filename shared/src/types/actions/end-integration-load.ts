import type { PresentLanguageIntegration } from '../language-integration/present-language-integration';

export type EndIntegrationLoad = {
  readonly type: 'END_INTEGRATION_LOAD';
  readonly newIntegrationAttrs: PresentLanguageIntegration;
};
