// @flow
import type { booleanLiteralPres } from './boolean-literal'
import type { functionCallPres } from './function-call'

export type valuePresentation = (
  | booleanLiteralPres
  | functionCallPres
  | false
)
