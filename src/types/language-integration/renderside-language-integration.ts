import type { RendersideAbsentLanguageIntegration } from './renderside-absent-language-integration';
import type { RendersidePresentLanguageIntegration } from './renderside-present-language-integration';

export type RendersideLanguageIntegration = (
  RendersideAbsentLanguageIntegration | RendersidePresentLanguageIntegration
);
