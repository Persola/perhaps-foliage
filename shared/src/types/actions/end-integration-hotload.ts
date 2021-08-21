import type { CoresidePresentLanguageIntegration } from '../language-integration/coreside-present-language-integration';

export type EndIntegrationHotload = {
  readonly type: 'END_INTEGRATION_LOAD';
  readonly newIntegrationAttrs: CoresidePresentLanguageIntegration;
};
