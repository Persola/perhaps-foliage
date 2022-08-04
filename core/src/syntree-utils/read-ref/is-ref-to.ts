import isRef from './is-ref';

import type { SynoRef } from '../../types/syntactic/syno-ref';
import type { SynoAttrVal } from '../../types/syntactic/mutables/syno-attr-val';

export default (
  maybeRef: SynoAttrVal,
  expectedId: string,
  expectedRelation: (string | null),
): boolean => {
  if (
    !isRef(maybeRef)
    || (maybeRef as SynoRef).id !== expectedId
    || (maybeRef as SynoRef).relation !== expectedRelation
  ) {
    return false;
  }

  return true;
};
