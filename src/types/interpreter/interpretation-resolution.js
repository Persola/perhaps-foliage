// @flow
import type { interpretationResolutionFailure } from './interpretation-resolution-failure'
import type { interpretationResolutionSuccess } from './interpretation-resolution-success'

export type interpretationResolution = ( // "disjount union type"
  interpretationResolutionFailure | interpretationResolutionSuccess
)
