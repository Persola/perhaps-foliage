// @flow
import type { booleanLiteral } from './syntactic-nodes/boolean-literal'
import type { functionCall } from './syntactic-nodes/function-call'
import type { functionDefinition } from './syntactic-nodes/function-definition'
import type { variableRef } from './syntactic-nodes/variable-ref'
import type { functionParameter } from './syntactic-nodes/function-definition/function-parameter'
import type { functionArgument } from './syntactic-nodes/function-call/function-argument'

export type syno = (
  | booleanLiteral
  | functionCall
  | functionDefinition
  | variableRef
  | functionParameter
  | functionArgument
)
