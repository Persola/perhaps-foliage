import type { SynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/syn-presno-args';

export type FunctionCallPresAttrs = {
  attrs: {
    readonly syntype: 'functionCall';
    readonly name: (null | string);
    },
    childPresnoArgs: {
      readonly argumentz: SynPresnoArgs[];
    },
  };
