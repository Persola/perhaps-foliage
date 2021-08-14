import type { Syno } from 'saliva-repl/dist/types/syntactic/syno';
import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { InterpretationResolution } from 'saliva-repl/dist/types/interpreter/interpretation-resolution';

import type { Scope } from './scope';

export type Interpreter = (
  interpretee: Syno,
  scope: Scope,
  state: StateSelector,
) => InterpretationResolution;
