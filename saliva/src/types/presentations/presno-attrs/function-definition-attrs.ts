import type { UnindexedNonSynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/unindexed-non-syn-presno-args';
import type { SynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/syn-presno-args';

export type FunctionDefPresAttrs = {
  attrs: {
    readonly syntype: 'functionDefinition';
  },
  childPresnoArgs: {
    readonly name: (null | UnindexedNonSynPresnoArgs);
    readonly parameters: SynPresnoArgs[];
    readonly body: (null | SynPresnoArgs);
  },
};
