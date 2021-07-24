import type { BooleanLiteral } from '../extension-staging-area/saliva/types/synos/boolean-literal';
import type { FunctionCall } from '../extension-staging-area/saliva/types/synos/function-call';
import type { FunctionDefinition } from '../extension-staging-area/saliva/types/synos/function-definition';
import type { FunctionParameter } from '../extension-staging-area/saliva/types/synos/function-parameter';
import type { Argument } from '../extension-staging-area/saliva/types/synos/argument';
import type { VariableRef } from '../extension-staging-area/saliva/types/synos/variable-ref';

export type Syno =
  | BooleanLiteral
  | FunctionCall
  | FunctionDefinition
  | FunctionParameter
  | Argument
  | VariableRef;
