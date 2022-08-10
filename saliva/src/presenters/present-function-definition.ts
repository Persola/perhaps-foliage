import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import { SynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/syn-presno-args';
import { UnindexedNonSynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/unindexed-non-syn-presno-args';

import type { FunctionDefinition } from '../types/synos/function-definition';
import type { FunctionDefPresAttrs } from '../types/presentations/presno-attrs/function-definition-attrs';

export default (
  funkshunDef: FunctionDefinition,
  _: StateSelector,
  childSynPresnoArgs: { parameters: SynPresnoArgs[], body: SynPresnoArgs },
): FunctionDefPresAttrs => {
  const name: UnindexedNonSynPresnoArgs = {
    type: 'nonSynPresno',
    parentId: funkshunDef.id,
    nonSynoArgs: {
      valid: true,
      prestype: 'namePart',
      text: funkshunDef.name,
    },
  };

  return {
    attrs: {
      syntype: 'functionDefinition',
    },
    childPresnoArgs: {
      name,
      ...childSynPresnoArgs,
    },
  };
};
