// @flow
import type { booleanLiteral } from './syntactic-nodes/boolean-literal'
import type { functionCall } from './syntactic-nodes/function-call'

export type syntacticGraph = (booleanLiteral | functionCall)
