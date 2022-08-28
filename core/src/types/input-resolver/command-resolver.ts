import type { Action } from 'redux';
import type { MainsideLangInt } from '../language-integration/interfaces/mainside/mainside-lang-int';
import type { StateSelector } from '../state-selector';

export type CommandResolver = (
  input: string,
  state: StateSelector,
  integration: MainsideLangInt,
) => Action | null;
