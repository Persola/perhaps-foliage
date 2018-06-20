// @flow
import type { functionDefinition } from './function-definition'
import type { booleanLiteral } from './boolean-literal'
import type { functionCall } from './function-call'
import type { variableRef } from './variable-ref'

export type functionArgument = (
  | booleanLiteral
  | functionCall
  | variableRef
  | functionDefinition
)
