import isRef from './is-ref';

import type { SynoAttrVal } from '../../types/syntactic/mutables/syno-attr-val';
import type { SynoRef } from '../../types/syntactic/syno-ref';

export default (probablyRef: SynoAttrVal): SynoRef => {
  if (!isRef(probablyRef)) {
    throw new TypeError(`Expected to be a syno ref: ${probablyRef}`);
  }

  return probablyRef as SynoRef;
};
