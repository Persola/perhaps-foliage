import type { UnindexedNonSynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/unindexed-non-syn-presno-args';

import type { Syntype } from '../../synos/syntype';

export type FunctionParameterPresAttrs = {
  attrs: {
    readonly syntype: 'functionParameter';
    readonly valueType: Syntype;
    },
  childPresnoArgs: {
    readonly slot: (null | UnindexedNonSynPresnoArgs);
  },
};
