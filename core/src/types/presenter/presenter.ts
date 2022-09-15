import Syno from '../../main-process/state-interface/syntactic-interface/readable/syno';

import type { PresnoAttrVal } from './presnos/presno-attrs';
import type { UnindexedPresnoArgs } from './presno-args/unindexed-presno-args';
import StateSelector from '../../main-process/state-interface/state-selector';

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
