import type { CoresideAbsentLanguageIntegration } from './coreside-absent-language-integration';
import type { CoresidePresentLanguageIntegration } from './coreside-present-language-integration';

export type CoresideLanguageIntegration = (
  CoresideAbsentLanguageIntegration | CoresidePresentLanguageIntegration
);
