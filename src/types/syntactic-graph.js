// @flow
import type { booleanLiteral } from './syntactic-nodes/boolean-literal'
import type { functionCall } from './syntactic-nodes/function-call'
import type { functionDefinition } from './syntactic-nodes/function-definition'

export type syntacticGraph = (
  | booleanLiteral
  | functionCall
  | functionDefinition
)
