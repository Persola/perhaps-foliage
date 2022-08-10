import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import { SynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/syn-presno-args';
import { UnindexedNonSynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/unindexed-non-syn-presno-args';

import type { Titan } from '../types/synos/titan';
import type { TitanPresAttrs } from '../types/presentations/presno-attrs/titan-attrs';

export default (
  titan: Titan,
  _: StateSelector,
  childSynPresnoArgs: { child: SynPresnoArgs },
): TitanPresAttrs => {
  const name: UnindexedNonSynPresnoArgs = {
    type: 'nonSynPresno',
    parentId: titan.id,
    nonSynoArgs: {
      valid: true,
      prestype: 'namePart',
      text: titan.name,
    },
  };

  return {
    attrs: {
      syntype: 'titan',
    },
    childPresnoArgs: {
      name,
      ...childSynPresnoArgs,
    },
  };
};
