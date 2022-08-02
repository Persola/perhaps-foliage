import type { PresnoRef } from 'perhaps-foliage/dist/types/presenter/presno-ref';

import type { Syntype } from '../../synos/syntype';

export type FunctionParameterPresAttrs = {
  readonly syntype: 'functionParameter';
  readonly slot: (null | PresnoRef);
  readonly valueSyntype: Syntype;
};
