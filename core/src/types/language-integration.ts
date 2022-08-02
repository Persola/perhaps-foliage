import type { PresentLangInt } from './language-integration/interfaces/complete/present-lang-int';
import type { AbsentLangInt } from './language-integration/interfaces/complete/absent-lang-int';

export type LangInt = (PresentLangInt | AbsentLangInt);
