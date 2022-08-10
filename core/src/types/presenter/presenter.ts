import { UnindexedPresnoArgs } from './presno-args/unindexed-presno-args';

export type Presenter = (...args: Array<unknown>) => {
  attrs: {
    syntype: string;
    [index: string]: unknown;
  },
  childPresnoArgs: {
    [index: string]: (UnindexedPresnoArgs | UnindexedPresnoArgs[]);
  },
};
