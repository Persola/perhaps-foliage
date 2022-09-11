import type { UnindexedNonSynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/unindexed-non-syn-presno-args';

export type FunctionParameterPresAttrs = {
  attrs: {
    readonly syntype: 'functionParameter';
    readonly valueType: string;
    },
  childPresnoArgs: {
    readonly slot: (null | UnindexedNonSynPresnoArgs);
  },
};
