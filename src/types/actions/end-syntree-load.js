// @flow
import type { SynoMap } from '../syno-map';

export type EndAsyncSyntreeLoad = {|
  +type: 'END_SYNTREE_LOAD',
  +newSynoMap: SynoMap,
|}
