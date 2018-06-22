// @flow
import type { booleanLiteralPres } from './boolean-literal'
import type { functionCallPres } from './function-call'
import type { functionDefPres } from './function-definition'
import type { functionParameterPres } from './function-parameter'

export type presentationGraph = (
  | booleanLiteralPres
  | functionCallPres
  | functionDefPres
  | functionParameterPres
  | false
  // TODO: add variableRef
)
