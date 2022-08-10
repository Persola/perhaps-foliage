import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import { UnindexedNonSynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/unindexed-non-syn-presno-args';

import type { FunctionParameter } from '../types/synos/function-parameter';
import type { FunctionParameterPresAttrs } from '../types/presentations/presno-attrs/function-parameter-attrs';

export default (
  parameter: FunctionParameter,
  _: StateSelector,
  childSynPresnoArgs: Record<string, never>,
): FunctionParameterPresAttrs => {
  const name: UnindexedNonSynPresnoArgs = {
    type: 'nonSynPresno',
    parentId: parameter.id,
    nonSynoArgs: {
      valid: true,
      prestype: 'namePart',
      text: parameter.name,
    },
  };

  return {
    attrs: {
      syntype: 'functionParameter',
      valueSyntype: parameter.valueSyntype,
    },
    childPresnoArgs: {
      slot: name,
      ...childSynPresnoArgs,
    },
  };
};
