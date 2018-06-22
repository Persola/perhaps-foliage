// @flow
import type { BooleanLiteralPres } from './boolean-literal'
import type { FunctionCallPres } from './function-call'
import type { FunctionDefPres } from './function-definition'
import type { FunctionParameterPres } from './function-parameter'

export type PresentationGraph = (
  | BooleanLiteralPres
  | FunctionCallPres
  | FunctionDefPres
  | FunctionParameterPres
  | false
  // TODO: add variableRef
)
