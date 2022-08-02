import type { MainsideAbsentLangInt } from './mainside-absent-lang-int';
import type { MainsidePresentLangInt } from './mainside-present-lang-int';

export type MainsideLangInt = (
  MainsideAbsentLangInt | MainsidePresentLangInt
);
