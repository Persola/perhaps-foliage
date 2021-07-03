// @flow
import type { SynoMap } from '../types/syno-map';
import type { MutableSynoMap } from '../types/mutable-syno-map';

export default (value: SynoMap): MutableSynoMap => {
  const jsond = JSON.stringify(value);
  return (jsond === undefined ? jsond : JSON.parse(jsond));
};
