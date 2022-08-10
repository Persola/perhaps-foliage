import type { UnindexedNonSynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/unindexed-non-syn-presno-args';
import type { SynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/syn-presno-args';

export type OlympianPresAttrs = {
  attrs: {
    readonly syntype: 'olympian';
  },
  childPresnoArgs: {
    readonly name: (null | UnindexedNonSynPresnoArgs);
    readonly child: (null | SynPresnoArgs);
  },
};
