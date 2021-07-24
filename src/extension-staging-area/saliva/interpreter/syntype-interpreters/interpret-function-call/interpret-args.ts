import type { StateSelector } from "../../../../../types/state-selector";
import type { Argument } from "../../../types/synos/argument";
import type { BooleanLiteral } from "../../../types/synos/boolean-literal";
export default (
  interpreter: (...args: Array<any>) => any,
  parentScope: [],
  argumentz: Argument[],
  state: StateSelector
): [Argument, BooleanLiteral][] => {
  const interpretedArgs: [Argument, BooleanLiteral][] = [];
  argumentz.forEach((arg: Argument) => {
    if (arg.syntype !== "argument") {
      throw new Error(`expected argument, got ${arg.syntype}`);
    }

    if (!arg.value) {
      throw new Error(`unassigned argument of ID ${arg.id}`);
    }

    const argResolution = interpreter(
      state.getSyno(arg.value.id),
      parentScope,
      state
    );

    if (argResolution.success) {
      interpretedArgs.push([arg, argResolution.result]);
    } else {
      throw new Error("arg interp failed");
    }
  });
  return interpretedArgs;
};
