// @flow
import type { SynoMap } from '../../../types/syno-map';
import type { Syno } from '../../../types/syno';
import type { ChildPresnoRef } from '../../../types/child-presno-ref';

export default (
  oldFocusedPresnoRef: ChildPresnoRef,
  synoMap: SynoMap,
  // eslint doesn't understand the parantheses around this type
  // eslint-disable-next-line function-paren-newline
): (Syno | false) => {
  let oldParent;
  if (oldFocusedPresnoRef.synoRef) {
    const oldFocusedPresno = synoMap[oldFocusedPresnoRef.id];
    oldParent = oldFocusedPresno.parent && synoMap[oldFocusedPresno.parent.id];
  } else {
    oldParent = synoMap[oldFocusedPresnoRef.parent.id];
  }
  return oldParent;
};
