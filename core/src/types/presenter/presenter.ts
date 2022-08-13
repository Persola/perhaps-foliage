// eslint-disable-next-line
import type { SynoPresenterArgs } from './syno-presenter-args';
import type { UnindexedPresnoArgs } from './presno-args/unindexed-presno-args';
import { PresnoNonChildAttrVal } from './presnos/presno-attrs';

// eslint-disable-next-line
export type Presenter = (...SynoPresenterArgs) => [
  {
    syntype: string;
    [index: string]: PresnoNonChildAttrVal;
  },
  {
    [index: string]: (UnindexedPresnoArgs | UnindexedPresnoArgs[]);
  },
];
