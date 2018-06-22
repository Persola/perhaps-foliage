// @flow
import type { booleanLiteral } from './syntactic-nodes/boolean-literal'
import type { functionCall } from './syntactic-nodes/function-call'
import type { functionDefinition } from './syntactic-nodes/function-definition'
import type { variableRef } from './syntactic-nodes/variable-ref'

export type valueSyno = (
  | booleanLiteral
  | functionCall
  | functionDefinition
  | variableRef
)
