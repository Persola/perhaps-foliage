import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { EnstackForPresentation } from 'perhaps-foliage/dist/types/presenter/enstack-for-presentation';

import type { FunctionParameter } from '../types/synos/function-parameter';
import type { FunctionParameterPresAttrs } from '../types/presentations/presno-attrs/function-parameter-attrs';

export default (
  parameter: FunctionParameter,
  _: StateSelector,
  enstackForPresentation: EnstackForPresentation,
): FunctionParameterPresAttrs => {
  const name = enstackForPresentation(
    {
      valid: true,
      presnoIndex: 0,
      prestype: 'namePart',
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
