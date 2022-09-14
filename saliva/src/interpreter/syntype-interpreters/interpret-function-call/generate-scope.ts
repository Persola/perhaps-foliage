import Argument from '../../../synos/argument';
import BooleanLiteral from '../../../synos/boolean-literal';
import FunctionDefinition from '../../../synos/function-definition';

import type { Scope } from '../../../types/interpreter/scope';

export default (
  resolvedCallee: FunctionDefinition,
  interpretedArgs: [Argument, BooleanLiteral][],
): Scope => {
  const interpreteeScope = [];

  resolvedCallee.parameters().forEach(param => {
    const argResolution = interpretedArgs.find(
      argRes => argRes[0].followRef('parameter').id === param.id,
    );

    interpreteeScope.push([param, argResolution[1]]);
  });

  return interpreteeScope;
};
