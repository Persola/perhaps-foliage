// @flow
import type { SynoId } from '../../../types/syno-id';
import type { Argument } from './synos/argument';
import type { BooleanLiteral } from './synos/boolean-literal';
import type { FunctionCall } from './synos/function-call';
import type { FunctionDefinition } from './synos/function-definition';
import type { FunctionParameter } from './synos/function-parameter';
import type { VariableRef } from './synos/variable-ref';

export type SalivaSelectors = {
  getArgument: (synoId: SynoId) => Argument,
  getBooleanLiteral: (synoId: SynoId) => BooleanLiteral,
  getFunctionCall: (synoId: SynoId) => FunctionCall,
  getFunctionDefinition: (synoId: SynoId) => FunctionDefinition,
  getFunctionParameter: (synoId: SynoId) => FunctionParameter,
  getVariableRef: (synoId: SynoId) => VariableRef,
}
