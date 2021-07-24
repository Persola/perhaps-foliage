import type { SynoMap } from '../types/syntactic/syno-map';
import type { MutableSynoMap } from '../types/syntactic/mutables/mutable-syno-map';
import type { Syno } from '../types/syntactic/syno';
import type { MutableSyno } from '../types/syntactic/mutables/mutable-syno';

export default (value => {
  const jsond = JSON.stringify(value);
  return jsond === undefined ? jsond : JSON.parse(jsond);
}) as (
  ((synoMap: SynoMap) => MutableSynoMap)
  & ((syno: Syno) => MutableSyno)
);
