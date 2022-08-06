import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { PresentAndReturnRef } from 'perhaps-foliage/dist/types/presenter/present-and-return-ref';

import type { Argument } from '../types/synos/argument';
import type { ArgumentPresAttrs } from '../types/presentations/presno-attrs/argument-attrs';
import type { FunctionParameter } from '../types/synos/function-parameter';

export default (
  argument: Argument,
  state: StateSelector,
  presentAndReturnRef: PresentAndReturnRef,
): ArgumentPresAttrs => {
  let name;
  if (!argument.parameter) {
    name = null;
  } else {
    const nameVal: string = (
      state.getSyno(argument.parameter.id) as FunctionParameter
    ).name;

    name = presentAndReturnRef(
      {
        valid: true,
        presnoIndex: 0,
        prestype: 'NamePart',
        text: nameVal,
      },
      argument,
    );
  }
  {
    id: string;
    parent: PresnoRef;
    prestype: 'bud';
    focused: boolean;
    valid: boolean;
  };
  
  return {
    syntype: 'argument',
    name,
    value: presentAndReturnRef(argument.value),
  };
};
