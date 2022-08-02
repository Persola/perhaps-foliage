import type { RendersideAbsentLangInt } from './renderside-absent-lang-int';
import type { RendersidePresentLangInt } from './renderside-present-lang-int';

export type RendersideLangInt = (
  RendersideAbsentLangInt | RendersidePresentLangInt
);
