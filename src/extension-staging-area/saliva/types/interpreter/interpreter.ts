import type { Syno } from '../../../../types/syntactic/syno';
import type { Scope } from './scope';
import type { StateSelector } from '../../../../types/state-selector';
import type { InterpretationResolution } from '../../../../types/interpreter/interpretation-resolution';

export type Interpreter = (
  interpretee: Syno,
  scope: Scope,
  state: StateSelector,
) => InterpretationResolution;
