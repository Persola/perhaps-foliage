// @flow
import type { booleanLiteralPres } from './boolean-literal'
import type { functionCallPres } from './function-call'
import type { functionDefPres } from './function-definition'

export type valuePresentation = (
  | booleanLiteralPres
  | functionCallPres
  | functionDefPres
  | false
)
