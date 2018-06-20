// @flow
import type { functionDefinition } from './function-definition'
import type { booleanLiteral } from './boolean-literal'

export type literalValue = (
  | booleanLiteral
  | functionDefinition
)
