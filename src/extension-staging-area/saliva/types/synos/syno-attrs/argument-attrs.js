// @flow
import type { SynoRef } from '../../../../../types/syno-ref';
import type { Syntype } from '../syntype';

export type ArgumentAttrs = {
  syntype: 'argument',
  valueSyntype: ?Syntype,
  value: (SynoRef | false),
  +parameter: (SynoRef | false)
}
