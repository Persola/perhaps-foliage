import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { PresentAndReturnRef } from 'saliva-repl/dist/types/presenter/present-and-return-ref';

import type { FunctionParameter } from '../types/synos/function-parameter';
import type { FunctionParameterPresAttrs } from '../types/presentations/presno-attrs/function-parameter-attrs';

export default (
  parameter: FunctionParameter,
  _: StateSelector,
  presentAndReturnRef: PresentAndReturnRef,
): FunctionParameterPresAttrs => {
  const name = presentAndReturnRef(
    {
      valid: true,
      presnoIndex: 0,
      prestype: 'NamePart',
      text: parameter.name,
    },
    parameter,
  );

  return {
    syntype: 'functionParameter',
    slot: name,
    valueSyntype: parameter.valueSyntype,
  };
};
