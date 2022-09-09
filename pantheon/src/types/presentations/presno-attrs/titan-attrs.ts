import type { SynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/syn-presno-args';

export type TitanPresAttrs = {
  attrs: {
    readonly name: string;
  },
  childPresnoArgs: {
    readonly child: (null | SynPresnoArgs);
  },
};
