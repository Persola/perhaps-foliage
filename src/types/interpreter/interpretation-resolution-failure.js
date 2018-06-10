// @flow
import type { interpretationError } from './interpretation-error'

export type interpretationResolutionFailure = {
  success: false,
  error: interpretationError
}
