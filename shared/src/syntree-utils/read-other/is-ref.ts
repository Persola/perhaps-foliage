import type { SynoAttrVal } from '../../types/syntactic/mutables/syno-attr-val';

export default (
  maybeRef: SynoAttrVal,
): boolean => {
  if (
    typeof maybeRef === 'object'
    && maybeRef !== null
    && 'synoRef' in maybeRef
    && maybeRef.synoRef === true
  ) {
    return true;
  }

  return false;
};
