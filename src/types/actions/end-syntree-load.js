// @flow
import type { MutableSynoMap } from '../mutable-syno-map';

export type EndAsyncSyntreeLoad = {|
  +type: 'END_SYNTREE_LOAD',
  +newSynoMap: MutableSynoMap,
|}
