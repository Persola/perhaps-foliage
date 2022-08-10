import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import { SynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/syn-presno-args';

import type { Argument } from '../types/synos/argument';
import type { ArgumentPresAttrs } from '../types/presentations/presno-attrs/argument-attrs';
import type { FunctionParameter } from '../types/synos/function-parameter';

export default (
  argument: Argument,
  state: StateSelector,
  childSynPresnoArgs: { value: SynPresnoArgs },
): ArgumentPresAttrs => {
  let name: string;
  if (!argument.parameter) {
    name = null;
  } else {
    name = (
      state.getSyno(argument.parameter.id) as FunctionParameter
    ).name;
  }

  return {
    attrs: {
      syntype: 'argument',
      name,
    },
    childPresnoArgs: {
      ...childSynPresnoArgs,
    },
  };
};
