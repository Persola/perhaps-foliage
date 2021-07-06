// @flow
import type { SynoMap } from '../types/syno-map';
import type { MutableSynoMap } from '../types/mutable-syno-map';
import type { Syno } from '../types/syno';
import type { MutableSyno } from '../types/mutable-syno';

export default (value => {
  const jsond = JSON.stringify(value);
  return (jsond === undefined ? jsond : JSON.parse(jsond));
}: (
  & ((SynoMap) => MutableSynoMap)
  & ((Syno) => MutableSyno)
));
