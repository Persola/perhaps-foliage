// @flow
import type { BooleanLiteral } from './syntactic-nodes/boolean-literal'
import type { FunctionCall } from './syntactic-nodes/function-call'
import type { FunctionDefinition } from './syntactic-nodes/function-definition'
import type { FunctionParameter } from './syntactic-nodes/function-parameter'
import type { FunctionArgument } from './syntactic-nodes/function-argument'
import type { VariableRef } from './syntactic-nodes/variable-ref'

export type Syno = (
  | BooleanLiteral
  | FunctionCall
  | FunctionDefinition
  | FunctionParameter
  | FunctionArgument
  | VariableRef
)
