// @flow
import type { FunctionDefinition } from './function-definition';
import type { BooleanLiteral } from './boolean-literal';
import type { FunctionCall } from './function-call';
import type { VariableRef } from './variable-ref';

export type FunctionArgument = (
  | BooleanLiteral
  | FunctionCall
  | VariableRef
  | FunctionDefinition
)
// switch out the two for LiteralValue?
