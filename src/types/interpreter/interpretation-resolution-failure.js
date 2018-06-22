// @flow
import type { InterpretationError } from './interpretation-error'

export type InterpretationResolutionFailure = {
  success: false,
  error: InterpretationError
}
