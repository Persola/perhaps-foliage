// @flow
import type { booleanLiteral } from './syntactic-nodes/boolean-literal'
import type { functionCall } from './syntactic-nodes/function-call'
import type { functionDefinition } from './syntactic-nodes/function-definition'
import type { variableRef } from './syntactic-nodes/variable-ref'
import type { functionParameter } from './syntactic-nodes/function-definition/function-parameter'

export type syntacticGraph = (
  | booleanLiteral
  | functionCall
  | functionDefinition
  | variableRef
  | functionParameter
)
