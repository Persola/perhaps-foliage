// @flow
import type { PresentLanguageIntegration } from '../language-integration/present-language-integration';

export type EndIntegrationLoad = {|
  +type: 'END_INTEGRATION_LOAD',
  +newIntegrationAttrs: PresentLanguageIntegration,
|}
