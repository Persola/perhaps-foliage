import { SynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/syn-presno-args';

export type ArgumentPresAttrs = {
  attrs: {
    readonly syntype: 'argument';
    readonly name: (null | string);
  },
  childPresnoArgs: {
    readonly value: SynPresnoArgs;
  },
};
