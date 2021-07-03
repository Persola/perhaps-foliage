// @flow
import type { Syno } from '../../../types/syno';
import type { SynoMap } from '../../../types/syno-map';
import type { Syntype } from './synos/syntype';

export type NamePresnoFocusable = {
  +[Syntype]: (Syno, SynoMap) => boolean
}
