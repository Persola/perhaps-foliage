import type { UnindexedNonSynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/unindexed-non-syn-presno-args';
import type { SynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/syn-presno-args';

export type TitanPresAttrs = {
  attrs: {
    readonly syntype: 'titan';
  },
  childPresnoArgs: {
    readonly name: (null | UnindexedNonSynPresnoArgs);
    readonly child: (null | SynPresnoArgs);
  },
};
