// @flow
import type { Syno } from './syno';
import type { SynoMap } from './syno-map';

export type NamePresnoFocusable = {
  +[string]: (
    syno: Syno,
    synoMap: SynoMap
  ) => boolean
}
