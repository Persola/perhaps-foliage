import type { Syno } from 'perhaps-foliage/dist/types/syntactic/syno';
import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { InterpretationResolution } from 'perhaps-foliage/dist/types/interpreter/interpretation-resolution';

import type { Scope } from './scope';

export type Interpreter = (
  interpretee: Syno,
  scope: Scope,
  state: StateSelector,
) => InterpretationResolution;
