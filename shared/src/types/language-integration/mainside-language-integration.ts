import type { MainsideAbsentLanguageIntegration } from './mainside-absent-language-integration';
import type { MainsidePresentLanguageIntegration } from './mainside-present-language-integration';

export type MainsideLanguageIntegration = (
  MainsideAbsentLanguageIntegration | MainsidePresentLanguageIntegration
);
