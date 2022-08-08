import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { EnstackForPresentation } from 'perhaps-foliage/dist/types/presenter/enstack-for-presentation';

import type { Argument } from '../types/synos/argument';
import type { ArgumentPresAttrs } from '../types/presentations/presno-attrs/argument-attrs';
import type { FunctionParameter } from '../types/synos/function-parameter';

export default (
  argument: Argument,
  state: StateSelector,
  enstackForPresentation: EnstackForPresentation,
): ArgumentPresAttrs => {
  let name;
  if (!argument.parameter) {
    name = null;
  } else {
    const nameVal: string = (
      state.getSyno(argument.parameter.id) as FunctionParameter
    ).name;

    name = enstackForPresentation(
      {
        valid: true,
        presnoIndex: 0,
        prestype: 'namePart',
        text: nameVal,
      },
      argument,
    );
  }

  const value = argument.value !== null
    ? enstackForPresentation(argument.value)
    : enstackForPresentation(
      {
        valid: true,
        presnoIndex: name ? 1 : 0,
        prestype: 'bud',
      },
      argument,
    );

  return {
    syntype: 'argument',
    name,
    value,
  };
};
