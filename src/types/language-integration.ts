import type { PresentLanguageIntegration } from './language-integration/present-language-integration';
import type { AbsentLanguageIntegration } from './language-integration/absent-language-integration';

export type LanguageIntegration = (PresentLanguageIntegration | AbsentLanguageIntegration);
