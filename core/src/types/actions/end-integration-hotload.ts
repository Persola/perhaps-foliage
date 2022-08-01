import type { MainsidePresentLanguageIntegration } from '../language-integration/mainside-present-language-integration';

export type EndIntegrationHotload = {
  readonly type: 'END_INTEGRATION_LOAD';
  readonly newIntegrationAttrs: MainsidePresentLanguageIntegration;
};
