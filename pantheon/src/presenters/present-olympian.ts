import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import { SynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/syn-presno-args';
import { UnindexedNonSynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/unindexed-non-syn-presno-args';

import type { Olympian } from '../types/synos/olympian';
import type { OlympianPresAttrs } from '../types/presentations/presno-attrs/olympian-attrs';

export default (
  olympian: Olympian,
  _: StateSelector,
  childSynPresnoArgs: { child: SynPresnoArgs },
): OlympianPresAttrs => {
  const name: UnindexedNonSynPresnoArgs = {
    type: 'nonSynPresno',
    parentId: olympian.id,
    nonSynoArgs: {
      valid: true,
      prestype: 'namePart',
      text: olympian.name,
    },
  };

  return {
    attrs: {
      syntype: 'olympian',
    },
    childPresnoArgs: {
      name,
      ...childSynPresnoArgs,
    },
  };
};
