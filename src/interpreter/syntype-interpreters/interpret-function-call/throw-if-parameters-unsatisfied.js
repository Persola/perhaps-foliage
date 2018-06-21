// @flow
import type { functionDefinition } from '../../../types/syntactic-nodes/function-definition' // eslint-disable-line no-unused-vars
import type { literalValue } from '../../../types/syntactic-nodes/literal-value' // eslint-disable-line no-unused-vars

export default (
  resolvedCallee: functionDefinition,
  interpretedArgs: {[slot: string]: literalValue},
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
