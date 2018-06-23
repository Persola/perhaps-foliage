// @flow
import type { BooleanLiteralPres } from './boolean-literal'
import type { FunctionCallPres } from './function-call'
import type { FunctionDefPres } from './function-definition'
import type { FunctionParameterPres } from './function-parameter'
import type { VariableRefPres } from './variable-ref'

export type Presno = (
  | BooleanLiteralPres
  | FunctionCallPres
  | FunctionDefPres
  | FunctionParameterPres
  | VariableRefPres
)
