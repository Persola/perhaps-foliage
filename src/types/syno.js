// @flow
import type { booleanLiteral } from './syntactic-nodes/boolean-literal'
import type { functionCall } from './syntactic-nodes/function-call'
import type { functionDefinition } from './syntactic-nodes/function-definition'
import type { functionParameter } from './syntactic-nodes/function-parameter'
import type { functionArgument } from './syntactic-nodes/function-argument'
import type { variableRef } from './syntactic-nodes/variable-ref'

export type syno = (
  | booleanLiteral
  | functionCall
  | functionDefinition
  | functionParameter
  | functionArgument
  | variableRef
)
