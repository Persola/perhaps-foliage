import type { Syno } from '../../../src/types/syntactic/syno';
import type { Scope } from './scope';
import type { StateSelector } from '../../../src/types/state-selector';
import type { InterpretationResolution } from '../../../src/types/interpreter/interpretation-resolution';

export type Interpreter = (
  interpretee: Syno,
  scope: Scope,
  state: StateSelector,
) => InterpretationResolution;
