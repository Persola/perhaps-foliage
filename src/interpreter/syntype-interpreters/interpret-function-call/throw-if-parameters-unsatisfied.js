// @flow
import type { FunctionDefinition } from '../../../types/syntactic-nodes/function-definition'
import type { Argument } from '../../../types/syntactic-nodes/argument'
import type { BooleanLiteral } from '../../../types/syntactic-nodes/boolean-literal'

export default (
  resolvedCallee: FunctionDefinition,
  interpretedArgs: [Argument, BooleanLiteral][],
  getSyno: Function
) => {
  const paramSlots = resolvedCallee.parameters.map(paramRef => getSyno(paramRef).name);
  const argSlots = interpretedArgs.map(pair => pair[0].name);

  const duplicatedParamSlots = paramSlots.filter((paramSlot: string) => {
    return paramSlots.filter(compSlot => paramSlot === compSlot).length > 1;
  });
  const duplicatedArgSlots = argSlots.filter((argSlot: string) => {
    return paramSlots.filter(compSlot => argSlot === compSlot).length > 1;
  });

  if (duplicatedParamSlots.length > 0) {
    throw new Error(`duplicate params: ${duplicatedParamSlots.join(', ')}`);
  }
  if (duplicatedArgSlots.length > 0) {
    throw new Error(`duplicate args: ${duplicatedArgSlots.join(', ')}`);
  }

  const unsatisfiedParamSlots = paramSlots.filter((paramSlot: string) => {
    return !argSlots.includes(paramSlot);
  });
  const extraArgSlots = argSlots.filter((argSlot: string) => {
    return !paramSlots.includes(argSlot);
  });

  if ((unsatisfiedParamSlots.length > 0) || (extraArgSlots.length > 0)) {
    throw new Error(`function "${resolvedCallee.name}" called with wrong parameters (unsatisfied: ${unsatisfiedParamSlots.join(', ')}; extra: ${extraArgSlots.join(', ')})`);
  }
};
