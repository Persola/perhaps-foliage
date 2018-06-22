// @flow
import type { BooleanLiteral } from './syntactic-nodes/boolean-literal'
import type { FunctionCall } from './syntactic-nodes/function-call'
import type { FunctionDefinition } from './syntactic-nodes/function-definition'
import type { VariableRef } from './syntactic-nodes/variable-ref'

export type ValueSyno = (
  | BooleanLiteral
  | FunctionCall
  | FunctionDefinition
  | VariableRef
)
