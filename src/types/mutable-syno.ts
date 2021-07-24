import type { MutableBooleanLiteral } from "../extension-staging-area/saliva/types/synos/mutable-synos/boolean-literal";
import type { MutableFunctionCall } from "../extension-staging-area/saliva/types/synos/mutable-synos/function-call";
import type { MutableFunctionDefinition } from "../extension-staging-area/saliva/types/synos/mutable-synos/function-definition";
import type { MutableFunctionParameter } from "../extension-staging-area/saliva/types/synos/mutable-synos/function-parameter";
import type { MutableArgument } from "../extension-staging-area/saliva/types/synos/mutable-synos/argument";
import type { MutableVariableRef } from "../extension-staging-area/saliva/types/synos/mutable-synos/variable-ref";
export type MutableSyno =
  | MutableBooleanLiteral
  | MutableFunctionCall
  | MutableFunctionDefinition
  | MutableFunctionParameter
  | MutableArgument
  | MutableVariableRef;
