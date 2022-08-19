import type { Syno } from '../syntactic/syno';
import type { StateSelector } from '../state-selector';
import type { PresnoAttrVal } from './presnos/presno-attrs';
import type { UnindexedPresnoArgs } from './presno-args/unindexed-presno-args';

// eslint-disable-next-line
export type SynoPresenter = (
  syno: Syno,
  state: StateSelector
) => [
  {
    syntype: string;
    [index: string]: PresnoAttrVal;
  },
  {
    [index: string]: (UnindexedPresnoArgs | UnindexedPresnoArgs[]);
  },
];
