import StateSelector from 'perhaps-foliage/dist/main-process/selectors/state-selector';
import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';

import type { InterpretationResolution } from 'perhaps-foliage/dist/types/interpreter/interpretation-resolution';

import type { Scope } from './scope';

export type Interpreter = (
  interpretee: Syno,
  scope: Scope,
  state: StateSelector,
) => InterpretationResolution;
