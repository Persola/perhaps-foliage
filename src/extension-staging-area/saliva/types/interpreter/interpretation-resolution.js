// @flow
import type { InterpretationResolutionFailure } from './interpretation-resolution-failure';
import type { InterpretationResolutionSuccess } from './interpretation-resolution-success';

export type InterpretationResolution = ( // "disjount union type"
  InterpretationResolutionFailure | InterpretationResolutionSuccess
)
