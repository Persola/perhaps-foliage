// @flow
import type { Focus } from '../../../types/editor-state/focus';
import type { SynoMap } from '../../../types/syno-map';
import type { ChildPresnoRef } from '../../../types/child-presno-ref';

export default (
  oldFocus: Focus,
  synoMap: SynoMap,
  oldFocusedPresnoRef: ChildPresnoRef,
): Focus => {
  if (oldFocusedPresnoRef.synoRef) {
    const oldFocusedPresno = synoMap[oldFocusedPresnoRef.id];
    if (oldFocusedPresno.parent === false) {
      console.warn('ignoring navigation outwards: no parent');
      return oldFocus;
    }
    return {
      synoId: oldFocusedPresno.parent.id,
      presnoIndex: false,
      charIndex: false,
    };
  }
  if (oldFocus.charIndex === false) {
    return {
      synoId: oldFocus.synoId,
      presnoIndex: false,
      charIndex: false,
    };
  }
  return {
    synoId: oldFocus.synoId,
    presnoIndex: oldFocus.presnoIndex,
    charIndex: false,
  };
};
