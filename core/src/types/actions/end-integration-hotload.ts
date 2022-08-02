import type { MainsidePresentLangInt } from '../language-integration/interfaces/mainside/mainside-present-lang-int';

export type EndIntegrationHotload = {
  readonly type: 'END_INTEGRATION_LOAD';
  readonly newIntegrationAttrs: MainsidePresentLangInt;
};
