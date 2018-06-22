// @flow
import type { FunctionDefinition } from '../../../types/syntactic-nodes/function-definition'
import type { LiteralValue } from '../../../types/syntactic-nodes/literal-value'

export default (
  resolvedCallee: FunctionDefinition,
  interpretedArgs: {[slot: string]: LiteralValue},
) => {
  const paramSlots = Object.keys(resolvedCallee.parameterz);
  const argSlots = Object.keys(interpretedArgs);
  const unsatisfiedParamSlots = paramSlots.filter((paramSlot: string) => {
    return !argSlots.includes(paramSlot);
  });
  const extraArgSlots = argSlots.filter((argSlot: string) => {
    return !paramSlots.includes(argSlot);
  });

  if (new Set(argSlots) !== new Set(paramSlots)) {
    return {
      success: false,
      error: {message: `function "${resolvedCallee.name}" called with wrong parameters (unsatisfied: ${unsatisfiedParamSlots.join(', ')}; extra: ${extraArgSlots.join(', ')})`}
    };
  }
};
